/**
 * Simulation Engine
 * Runs year-by-year financial projections from current age to 90
 */

import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import * as taxEngine from './tax'
import * as niEngine from './ni'
import * as pensionEngine from './pension'

export interface YearSimulation {
  year: number
  age: number
  salary: number
  pensionIncome: number
  niIncome: number
  rentalIncome: number
  totalIncome: number
  totalExpenses: number
  grossTax: number
  niContribution: number
  netIncome: number
  assetReturn: number
  netSavings: number
  totalAssets: number
  warnings: string[]
}

export interface Insight {
  type: 'warning' | 'info' | 'success'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
}

/**
 * Run complete financial simulation for a scenario
 */
export async function runSimulation(
  scenarioId: string,
  prismaClient: PrismaClient
): Promise<string> {
  const runId = uuidv4()

  try {
    // Fetch scenario and related data
    const scenario = await prismaClient.scenario.findUnique({
      where: { id: scenarioId },
      include: {
        plan: {
          include: {
            household: {
              include: { persons: true },
            },
          },
        },
        assets: true,
        liabilities: true,
        incomeStreams: true,
        expenseStreams: true,
        contribSchedules: true,
        goals: true,
        retirementEvents: true,
      },
    })

    if (!scenario) {
      throw new Error('Scenario not found')
    }

    const household = scenario.plan.household
    const persons = household.persons
    const primaryPerson = persons[0] // Assuming first person is primary
    const partner = persons[1] // Optional partner

    // Initialize simulation data
    const currentYear = new Date().getFullYear()
    const startAge = primaryPerson.currentAge || 48
    const projectionYears: YearSimulation[] = []
    const insights: Insight[] = []

    let currentAssets = scenario.assets.reduce((sum, a) => sum + a.value, 0)
    let currentLiabilities = scenario.liabilities.reduce((sum, l) => sum + l.amount, 0)
    let netWorth = currentAssets - currentLiabilities

    // Run simulation year by year
    for (let yearOffset = 0; yearOffset <= 42; yearOffset++) {
      // Project to age 90
      const projectionYear = currentYear + yearOffset
      const projectionAge = startAge + yearOffset

      if (projectionAge > 90) break

      const yearData: YearSimulation = {
        year: projectionYear,
        age: projectionAge,
        salary: 0,
        pensionIncome: 0,
        niIncome: 0,
        rentalIncome: 0,
        totalIncome: 0,
        totalExpenses: 0,
        grossTax: 0,
        niContribution: 0,
        netIncome: 0,
        assetReturn: 0,
        netSavings: 0,
        totalAssets: currentAssets,
        warnings: [],
      }

      // Calculate income for the year
      let grossIncome = 0

      // Salary income (until retirement event)
      const isRetired = scenario.retirementEvents.some(
        (e) => e.triggerAge <= projectionAge
      )

      if (!isRetired) {
        const salaryStreams = scenario.incomeStreams.filter(
          (s) => s.type === 'salary' && (!s.endAge || s.endAge > projectionAge)
        )
        yearData.salary = salaryStreams.reduce((sum, s) => sum + (s.monthlyAmount || 0) * 12, 0)
        grossIncome += yearData.salary
      }

      // Rental income
      const rentalStreams = scenario.incomeStreams.filter(
        (s) => s.type === 'rental' && (!s.endAge || s.endAge > projectionAge)
      )
      yearData.rentalIncome = rentalStreams.reduce(
        (sum, s) => sum + (s.monthlyAmount || 0) * 12,
        0
      )
      grossIncome += yearData.rentalIncome

      // Pension income (after retirement event)
      if (isRetired && projectionAge >= (primaryPerson.retirementTargetAge || 55)) {
        // Simplified: use defined contribution from scenario
        yearData.pensionIncome = (scenario.assets.find((a) => a.type === 'pension')?.value || 0) / 200 * 12
        grossIncome += yearData.pensionIncome
      }

      // Expenses
      const monthlyExpenses =
        scenario.expenseStreams.reduce((sum, e) => sum + (e.monthlyAmount || 0), 0) || 20000
      yearData.totalExpenses = monthlyExpenses * 12

      // Calculate taxes
      const creditPoints = 2 // Simplified
      const taxResult = taxEngine.calculateAnnualTax(grossIncome, creditPoints)
      yearData.grossTax = taxResult.tax

      // NI contribution (if still working)
      if (!isRetired && yearData.salary > 0) {
        const monthlyNI = niEngine.calculateNIContribution(yearData.salary / 12)
        yearData.niContribution = monthlyNI.employee * 12
      }

      yearData.totalIncome = grossIncome
      yearData.netIncome = grossIncome - yearData.grossTax - yearData.niContribution

      // Asset returns
      const assetReturnRate = 0.05 // 5% assumed annual return
      yearData.assetReturn = Math.round(currentAssets * assetReturnRate)

      // Net savings/withdrawal
      yearData.netSavings = yearData.netIncome - yearData.totalExpenses + yearData.assetReturn

      // Update totals
      currentAssets = Math.max(0, currentAssets + yearData.netSavings)
      netWorth = currentAssets - currentLiabilities
      yearData.totalAssets = currentAssets

      // Generate warnings
      if (yearData.netSavings < 0 && projectionAge >= (primaryPerson.retirementTargetAge || 55)) {
        yearData.warnings.push('תזרים מזומנים שלילי בשנת הפרישה')
      }

      if (currentAssets <= 0 && projectionAge < 90) {
        yearData.warnings.push('הנכסים הוצאו לפני גיל 90')
        insights.push({
          type: 'warning',
          title: 'בעיה בתקציב',
          description: `הנכסים אזלו בגיל ${projectionAge}. שקול הגדלת הכנסות או הפחתת הוצאות.`,
          severity: 'high',
        })
        break
      }

      projectionYears.push(yearData)
    }

    // Generate insights
    if (netWorth > 5000000) {
      insights.push({
        type: 'success',
        title: 'מצב כלכלי חזק',
        description: `השווי הנטו הצפוי בפרישה הוא ₪${(netWorth / 1000000).toFixed(1)}M`,
        severity: 'low',
      })
    } else if (netWorth < 500000) {
      insights.push({
        type: 'warning',
        title: 'סיכון לתכנון',
        description: 'השווי הנטו הצפוי בפרישה נמוך. שקול הגדלת חיסכון או עיכוב פרישה.',
        severity: 'high',
      })
    }

    // Store run in database
    const run = await prismaClient.simulationRun.create({
      data: {
        id: runId,
        scenarioId,
        status: 'completed',
        startedAt: new Date(),
        completedAt: new Date(),
        yearResults: {
          create: projectionYears.map((yr) => ({
            year: yr.year,
            age: yr.age,
            salary: yr.salary,
            pensionIncome: yr.pensionIncome,
            niIncome: yr.niIncome,
            rentalIncome: yr.rentalIncome,
            totalIncome: yr.totalIncome,
            totalExpenses: yr.totalExpenses,
            grossTax: yr.grossTax,
            niContribution: yr.niContribution,
            netIncome: yr.netIncome,
            assetReturn: yr.assetReturn,
            netSavings: yr.netSavings,
            totalAssets: yr.totalAssets,
          })),
        },
        insights: {
          create: insights.map((i) => ({
            type: i.type,
            title: i.title,
            description: i.description,
            severity: i.severity,
          })),
        },
      },
    })

    return runId
  } catch (error) {
    console.error('Simulation error:', error)

    // Create failed run record
    await prismaClient.simulationRun.create({
      data: {
        id: runId,
        scenarioId,
        status: 'failed',
        startedAt: new Date(),
        completedAt: new Date(),
      },
    }).catch(() => {}) // Swallow if it fails

    throw error
  }
}
