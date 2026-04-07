/**
 * Israeli Tax Engine 2026
 * Calculates income tax, capital gains tax, and pension tax based on Israeli regulations
 */

interface TaxBracket {
  ceiling: number
  rate: number
}

const TAX_BRACKETS_2026: TaxBracket[] = [
  { ceiling: 81480, rate: 0.1 },
  { ceiling: 116760, rate: 0.14 },
  { ceiling: 187440, rate: 0.2 },
  { ceiling: 260520, rate: 0.31 },
  { ceiling: 542160, rate: 0.35 },
  { ceiling: Infinity, rate: 0.47 },
]

const CREDIT_POINT_VALUE_ANNUAL = 2820 // ILS per year (235/month)
const PENSION_EXEMPTION_MONTHLY = 9430 // ILS
const CAPITAL_GAINS_TAX_RATE = 0.25
const CAPITAL_GAINS_TAX_RATE_INDEXED = 0.15

export interface TaxResult {
  tax: number
  netIncome: number
  effectiveRate: number
}

export interface PensionTaxResult {
  monthlyTax: number
  netPension: number
}

/**
 * Calculate annual income tax based on Israeli tax brackets
 */
export function calculateAnnualTax(
  grossAnnual: number,
  creditPoints: number
): TaxResult {
  let tax = 0
  let previousCeiling = 0

  // Calculate tax based on brackets
  for (const bracket of TAX_BRACKETS_2026) {
    const taxableUpToBracket = Math.min(grossAnnual, bracket.ceiling)
    const bracketIncome = taxableUpToBracket - previousCeiling

    if (bracketIncome > 0) {
      tax += bracketIncome * bracket.rate
    }

    previousCeiling = bracket.ceiling

    if (grossAnnual <= bracket.ceiling) {
      break
    }
  }

  // Apply credit points
  const creditPointValue = creditPoints * CREDIT_POINT_VALUE_ANNUAL
  tax = Math.max(0, tax - creditPointValue)

  const netIncome = grossAnnual - tax
  const effectiveRate = grossAnnual > 0 ? tax / grossAnnual : 0

  return {
    tax: Math.round(tax),
    netIncome: Math.round(netIncome),
    effectiveRate: Math.round(effectiveRate * 10000) / 10000,
  }
}

/**
 * Calculate capital gains tax
 * @param gain The capital gain amount
 * @param indexed Whether the gain is indexed (lower rate applies)
 */
export function calculateCapitalGainsTax(gain: number, indexed: boolean = false): number {
  const rate = indexed ? CAPITAL_GAINS_TAX_RATE_INDEXED : CAPITAL_GAINS_TAX_RATE
  return Math.round(gain * rate)
}

/**
 * Calculate monthly pension tax after taking out pension exemption
 */
export function calculatePensionTax(
  monthlyPension: number,
  creditPoints: number
): PensionTaxResult {
  const taxableAmount = Math.max(0, monthlyPension - PENSION_EXEMPTION_MONTHLY)
  const monthlyTaxable = taxableAmount
  const annualTaxable = monthlyTaxable * 12

  // Calculate tax on taxable pension portion
  const { tax: annualTax } = calculateAnnualTax(annualTaxable, creditPoints)
  const monthlyTax = annualTax / 12

  const netPension = monthlyPension - monthlyTax

  return {
    monthlyTax: Math.round(monthlyTax),
    netPension: Math.round(netPension),
  }
}

/**
 * Calculate effective tax rate on income
 */
export function getEffectiveTaxRate(grossIncome: number, creditPoints: number): number {
  const { effectiveRate } = calculateAnnualTax(grossIncome, creditPoints)
  return effectiveRate
}
