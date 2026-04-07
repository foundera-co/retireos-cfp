export type UserRole = 'CLIENT' | 'ADVISOR' | 'ADMIN'
export type AssetType = 'pension' | 'provident' | 'study_fund' | 'stocks' | 'real_estate' | 'cash'
export type LiabilityType = 'mortgage' | 'loan' | 'credit_card'
export type IncomeType = 'salary' | 'pension' | 'rental' | 'other'
export type ExpenseCategory = 'living' | 'health' | 'education' | 'travel' | 'other'
export type WithdrawalStrategy = 'taxable_first' | 'pension_first' | 'pro_rata'
export type PlanWorkflowState = 'gathering_info' | 'analysis' | 'recommendations' | 'implementation' | 'completed'
export type SimulationStatus = 'pending' | 'running' | 'completed' | 'failed'
export type InsightType = 'warning' | 'info' | 'success'
export type InsightSeverity = 'low' | 'medium' | 'high'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  orgId: string
  createdAt: Date
}

export interface Org {
  id: string
  name: string
  email: string
  timezone: string
  createdAt: Date
}

export interface Person {
  id: string
  householdId: string
  name: string
  currentAge: number
  gender: 'male' | 'female'
  employmentStatus: string
  retirementTargetAge?: number
  createdAt: Date
}

export interface Household {
  id: string
  orgId: string
  name: string
  archivedAt?: Date
  persons: Person[]
  plans: Plan[]
  createdAt: Date
  updatedAt: Date
}

export interface Plan {
  id: string
  householdId: string
  name: string
  rulesetId?: string
  workflowState: PlanWorkflowState
  scenarios: Scenario[]
  createdAt: Date
  updatedAt: Date
}

export interface Scenario {
  id: string
  planId: string
  name: string
  isBaseScenario: boolean
  withdrawalStrategy: WithdrawalStrategy
  assets: Asset[]
  liabilities: Liability[]
  incomeStreams: IncomeStream[]
  expenseStreams: ExpenseStream[]
  goals: Goal[]
  retirementEvents: RetirementEvent[]
  contribSchedules: ContribSchedule[]
  createdAt: Date
  updatedAt: Date
}

export interface Asset {
  id: string
  scenarioId: string
  type: AssetType
  name: string
  value: number
  annualReturn: number
  createdAt: Date
}

export interface Liability {
  id: string
  scenarioId: string
  type: LiabilityType
  name: string
  amount: number
  monthlyPayment: number
  endYear?: number
  createdAt: Date
}

export interface IncomeStream {
  id: string
  scenarioId: string
  type: IncomeType
  name: string
  monthlyAmount: number
  startAge?: number
  endAge?: number
  personId?: string
  person?: Person
  createdAt: Date
}

export interface ExpenseStream {
  id: string
  scenarioId: string
  category: ExpenseCategory
  monthlyAmount: number
  createdAt: Date
}

export interface ContribSchedule {
  id: string
  scenarioId: string
  assetId: string
  asset?: Asset
  monthlyAmount: number
  startAge?: number
  endAge?: number
  createdAt: Date
}

export interface Goal {
  id: string
  scenarioId: string
  name: string
  targetAmount: number
  targetAge: number
  createdAt: Date
}

export interface RetirementEvent {
  id: string
  scenarioId: string
  personId: string
  person?: Person
  triggerAge: number
  createdAt: Date
}

export interface Ruleset {
  id: string
  orgId: string
  year: number
  publishedAt?: Date
  taxRules: TaxRule[]
  niRules: NIRule[]
  createdAt: Date
}

export interface TaxRule {
  id: string
  rulesetId: string
  ceiling: number
  rate: number
}

export interface NIRule {
  id: string
  rulesetId: string
  name: string
  employeeRate: number
  employerRate: number
  ceiling: number
}

export interface YearResult {
  id: string
  runId: string
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
}

export interface Insight {
  id: string
  runId: string
  type: InsightType
  title: string
  description: string
  severity: InsightSeverity
}

export interface SimulationRun {
  id: string
  scenarioId: string
  status: SimulationStatus
  startedAt: Date
  completedAt?: Date
  yearResults: YearResult[]
  insights: Insight[]
  createdAt: Date
}

export interface TaxResult {
  tax: number
  netIncome: number
  effectiveRate: number
}

export interface PensionResult {
  monthlyPension: number
  taxableAmount: number
  exemptAmount: number
  taxExemption: number
}
