/**
 * Israeli National Insurance (ביטוח לאומי) Engine 2026
 * Calculates NI contributions and old age benefits
 */

const NI_CEILING_MONTHLY = 51910 // ILS
const NI_EMPLOYEE_RATE_TIER1 = 0.035 // 3.5% up to 7,522
const NI_EMPLOYEE_CEILING_TIER1 = 7522
const NI_EMPLOYEE_RATE_TIER2 = 0.12 // 12% above
const NI_EMPLOYER_RATE = 0.035 // Simplified - 3.5% on base, 12% on excess
const NI_EMPLOYER_CEILING_TIER1 = 7522
const NI_EMPLOYER_RATE_TIER2 = 0.12

const OLD_AGE_BENEFIT_BASE = 5385 // ILS/month at retirement age
const SENIORITY_BONUS_RATE = 0.005 // 0.5% per year of insurance

export interface NIContribution {
  employee: number
  employer: number
  total: number
}

/**
 * Calculate NI contribution based on monthly income
 * Rates: 3.5% up to 7,522, then 12% above up to ceiling of 51,910
 */
export function calculateNIContribution(monthlyIncome: number): NIContribution {
  const cappedIncome = Math.min(monthlyIncome, NI_CEILING_MONTHLY)

  // Employee contribution - two tiers
  let employeeNI = 0
  if (cappedIncome > 0) {
    employeeNI += Math.min(cappedIncome, NI_EMPLOYEE_CEILING_TIER1) * NI_EMPLOYEE_RATE_TIER1
  }
  if (cappedIncome > NI_EMPLOYEE_CEILING_TIER1) {
    employeeNI += (cappedIncome - NI_EMPLOYEE_CEILING_TIER1) * NI_EMPLOYEE_RATE_TIER2
  }

  // Employer contribution - same structure
  let employerNI = 0
  if (cappedIncome > 0) {
    employerNI += Math.min(cappedIncome, NI_EMPLOYER_CEILING_TIER1) * NI_EMPLOYER_RATE
  }
  if (cappedIncome > NI_EMPLOYER_CEILING_TIER1) {
    employerNI += (cappedIncome - NI_EMPLOYER_CEILING_TIER1) * NI_EMPLOYER_RATE_TIER2
  }

  return {
    employee: Math.round(employeeNI),
    employer: Math.round(employerNI),
    total: Math.round(employeeNI + employerNI),
  }
}

/**
 * Calculate old age benefit at retirement
 * Base benefit + seniority bonus (0.5% per year insured)
 * @param age Current age
 * @param gender 'male' (retirement at 70) or 'female' (retirement at 65)
 * @param yearsInsured Years of national insurance contributions
 */
export function calculateOldAgeBenefit(
  age: number,
  gender: 'male' | 'female',
  yearsInsured: number
): number {
  const retirementAge = gender === 'male' ? 70 : 65

  // Only applicable at/after retirement age
  if (age < retirementAge) {
    return 0
  }

  // Cap years at reasonable maximum (e.g., 50 years max)
  const cappedYearsInsured = Math.min(yearsInsured, 50)
  const seniorityBonus = cappedYearsInsured * SENIORITY_BONUS_RATE

  const monthlyBenefit = OLD_AGE_BENEFIT_BASE * (1 + seniorityBonus)

  return Math.round(monthlyBenefit)
}

/**
 * Get NI retirement age for gender
 */
export function getNIRetirementAge(gender: 'male' | 'female'): number {
  return gender === 'male' ? 70 : 65
}

/**
 * Calculate years of NI insurance up to a given age
 * Assumes contributions from age 21 to given age
 */
export function calculateYearsInsured(currentAge: number, startAge: number = 21): number {
  return Math.max(0, currentAge - startAge)
}
