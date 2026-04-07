/**
 * Israeli Pension Engine
 * Calculates pension fund accumulation, pension income, and קיבוע זכויות (Form 161) exemptions
 */

const DEFAULT_ANNUITY_FACTOR = 200 // Default divisor for pension income calculation
const FORM_161_THRESHOLD_2026 = 9430 // Monthly pension exemption threshold

export interface Fixed161Result {
  monthlyPension: number
  taxableAmount: number
  exemptAmount: number
  taxExemption: number // Annual tax savings
}

/**
 * Calculate pension fund accumulation over time
 * Uses compound interest formula: FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
 * @param currentBalance Current pension fund balance
 * @param monthlyContrib Monthly contribution amount
 * @param returnRate Annual return rate (decimal, e.g., 0.06 for 6%)
 * @param years Number of years to project
 */
export function calculatePensionAccumulation(
  currentBalance: number,
  monthlyContrib: number,
  returnRate: number,
  years: number
): number {
  const monthlyRate = returnRate / 12
  const months = years * 12

  // Future value of current balance
  const fvBalance = currentBalance * Math.pow(1 + monthlyRate, months)

  // Future value of monthly contributions
  let fvContribs = 0
  if (monthlyRate > 0) {
    fvContribs = monthlyContrib * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
  } else {
    fvContribs = monthlyContrib * months
  }

  return Math.round(fvBalance + fvContribs)
}

/**
 * Calculate monthly pension income from accumulated balance
 * Standard formula: accumulation / annuity factor
 * @param accumulation Total pension fund balance
 * @param annuityFactor Divisor for income calculation (typically 200)
 */
export function calculateMonthlyPension(
  accumulation: number,
  annuityFactor: number = DEFAULT_ANNUITY_FACTOR
): number {
  return Math.round(accumulation / annuityFactor)
}

/**
 * Calculate קיבוע זכויות (Form 161) tax exemption
 * Up to 9,430 ILS/month is exempt from income tax
 * This affects tax liability when taking retirement income
 * @param monthlyPension Total monthly pension income
 * @param year Tax year (for reference)
 */
export function calculateFixed161Exemption(
  monthlyPension: number,
  year: number = 2026
): Fixed161Result {
  const exemptAmount = Math.min(monthlyPension, FORM_161_THRESHOLD_2026)
  const taxableAmount = Math.max(0, monthlyPension - FORM_161_THRESHOLD_2026)

  // Rough tax exemption benefit: 20% on exempt amount (average rate)
  const taxExemption = Math.round(exemptAmount * 0.20 * 12) // Annual

  return {
    monthlyPension,
    taxableAmount,
    exemptAmount,
    taxExemption,
  }
}

/**
 * Get form 161 threshold for a given year
 */
export function getForm161Threshold(year: number = 2026): number {
  // In reality, this threshold adjusts yearly. For now, return constant.
  return FORM_161_THRESHOLD_2026
}

/**
 * Calculate pension years to accumulation goal
 * Used for backward projection from desired retirement income
 */
export function yearsToReachAccumulationGoal(
  currentBalance: number,
  targetAccumulation: number,
  monthlyContrib: number,
  returnRate: number
): number {
  if (targetAccumulation <= currentBalance) {
    return 0
  }

  // Binary search for the number of years needed
  let low = 0
  let high = 50
  let result = 50

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2
    const accumulated = calculatePensionAccumulation(
      currentBalance,
      monthlyContrib,
      returnRate,
      mid
    )

    if (Math.abs(accumulated - targetAccumulation) < 1000) {
      return Math.round(mid * 10) / 10
    }

    if (accumulated < targetAccumulation) {
      low = mid
    } else {
      high = mid
    }
  }

  return result
}

/**
 * Calculate required monthly contribution to reach a target accumulation
 */
export function requiredMonthlyContribution(
  currentBalance: number,
  targetAccumulation: number,
  returnRate: number,
  years: number
): number {
  const monthlyRate = returnRate / 12
  const months = years * 12

  // FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
  // Solve for PMT:
  const fvBalance = currentBalance * Math.pow(1 + monthlyRate, months)
  const remainingTarget = targetAccumulation - fvBalance

  let monthlyContrib = 0
  if (monthlyRate > 0) {
    const multiplier = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
    monthlyContrib = remainingTarget / multiplier
  } else if (months > 0) {
    monthlyContrib = remainingTarget / months
  }

  return Math.round(Math.max(0, monthlyContrib))
}
