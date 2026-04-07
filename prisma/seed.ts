import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create organization
  const org = await prisma.org.upsert({
    where: { email: 'admin@retireos.co.il' },
    update: {},
    create: {
      name: 'RetireOS Demo',
      email: 'admin@retireos.co.il',
      timezone: 'Asia/Jerusalem',
    },
  })

  console.log(`Organization created/updated: ${org.name}`)

  // Hash passwords
  const adminPassword = await bcrypt.hash('Admin123!', 10)
  const advisorPassword = await bcrypt.hash('Advisor123!', 10)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@retireos.co.il' },
    update: {},
    create: {
      email: 'admin@retireos.co.il',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      orgId: org.id,
    },
  })

  console.log(`Admin user created/updated: ${adminUser.email}`)

  // Create advisor user
  const advisorUser = await prisma.user.upsert({
    where: { email: 'advisor@retireos.co.il' },
    update: {},
    create: {
      email: 'advisor@retireos.co.il',
      name: 'David Advisor',
      password: advisorPassword,
      role: 'ADVISOR',
      orgId: org.id,
    },
  })

  console.log(`Advisor user created/updated: ${advisorUser.email}`)

  // Create 2026 ruleset
  const ruleset = await prisma.ruleset.create({
    data: {
      year: 2026,
      orgId: org.id,
      publishedAt: new Date(),
      taxRules: {
        create: [
          { ceiling: 81480, rate: 0.1 },
          { ceiling: 116760, rate: 0.14 },
          { ceiling: 187440, rate: 0.2 },
          { ceiling: 260520, rate: 0.31 },
          { ceiling: 542160, rate: 0.35 },
          { ceiling: Infinity, rate: 0.47 },
        ],
      },
      niRules: {
        create: [
          {
            name: 'ביטוח לאומי - שכר עד תקרה',
            employeeRate: 0.035,
            employerRate: 0.035,
            ceiling: 7522,
          },
          {
            name: 'ביטוח לאומי - שכר מעל תקרה',
            employeeRate: 0.12,
            employerRate: 0.12,
            ceiling: 51910,
          },
        ],
      },
    },
  })

  console.log(`Ruleset created: Year ${ruleset.year}`)

  // Create household with Dan & Karen
  const household = await prisma.household.create({
    data: {
      name: 'משפחת דן וקרן',
      orgId: org.id,
      persons: {
        create: [
          {
            name: 'דן',
            currentAge: 48,
            gender: 'male',
            employmentStatus: 'employed',
            retirementTargetAge: 55,
          },
          {
            name: 'קרן',
            currentAge: 46,
            gender: 'female',
            employmentStatus: 'employed',
            retirementTargetAge: 55,
          },
        ],
      },
    },
    include: {
      persons: true,
    },
  })

  console.log(`Household created: ${household.name}`)

  const danPerson = household.persons[0]
  const karenPerson = household.persons[1]

  // Create plan
  const plan = await prisma.plan.create({
    data: {
      name: 'תכנית הפרישה הראשית',
      householdId: household.id,
      rulesetId: ruleset.id,
      workflowState: 'gathering_info',
      scenarios: {
        create: {
          name: 'תרחיש בסיסי',
          isBaseScenario: true,
          withdrawalStrategy: 'pro_rata',
        },
      },
    },
    include: {
      scenarios: true,
    },
  })

  console.log(`Plan created: ${plan.name}`)

  const scenario = plan.scenarios[0]

  // Create assets
  const assetPension = await prisma.asset.create({
    data: {
      scenarioId: scenario.id,
      type: 'pension',
      name: 'קרן פנסיה',
      value: 1800000,
      annualReturn: 0.05,
    },
  })

  const assetRealEstate = await prisma.asset.create({
    data: {
      scenarioId: scenario.id,
      type: 'real_estate',
      name: 'דירה בתל אביב',
      value: 3500000,
      annualReturn: 0.03,
    },
  })

  const assetSavings = await prisma.asset.create({
    data: {
      scenarioId: scenario.id,
      type: 'stocks',
      name: 'חסכונות בני אומה',
      value: 520000,
      annualReturn: 0.06,
    },
  })

  const assetCash = await prisma.asset.create({
    data: {
      scenarioId: scenario.id,
      type: 'cash',
      name: 'חשבון עו"ש',
      value: 330000,
      annualReturn: 0.02,
    },
  })

  console.log('Assets created')

  // Create income streams
  await prisma.incomeStream.create({
    data: {
      scenarioId: scenario.id,
      type: 'salary',
      name: 'שכר דן',
      monthlyAmount: 16000,
      startAge: 48,
      endAge: 55,
      personId: danPerson.id,
    },
  })

  await prisma.incomeStream.create({
    data: {
      scenarioId: scenario.id,
      type: 'salary',
      name: 'שכר קרן',
      monthlyAmount: 20000,
      startAge: 46,
      endAge: 55,
      personId: karenPerson.id,
    },
  })

  console.log('Income streams created')

  // Create expense stream
  await prisma.expenseStream.create({
    data: {
      scenarioId: scenario.id,
      category: 'living',
      monthlyAmount: 20000,
    },
  })

  console.log('Expense streams created')

  // Create goals
  await prisma.goal.create({
    data: {
      scenarioId: scenario.id,
      name: 'חנוך בנים',
      targetAmount: 213000,
      targetAge: 55,
    },
  })

  await prisma.goal.create({
    data: {
      scenarioId: scenario.id,
      name: 'חתונה',
      targetAmount: 2100000,
      targetAge: 60,
    },
  })

  console.log('Goals created')

  // Create retirement events
  await prisma.retirementEvent.create({
    data: {
      scenarioId: scenario.id,
      personId: danPerson.id,
      triggerAge: 55,
    },
  })

  await prisma.retirementEvent.create({
    data: {
      scenarioId: scenario.id,
      personId: karenPerson.id,
      triggerAge: 55,
    },
  })

  console.log('Retirement events created')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
