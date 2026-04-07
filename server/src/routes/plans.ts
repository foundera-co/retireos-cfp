import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router = Router()

/**
 * GET /households/:hid/plans
 * List plans for a household
 */
router.get('/households/:hid/plans', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { hid } = req.params

  try {
    // Check household authorization
    const household = await prisma.household.findUnique({
      where: { id: hid },
    })

    if (!household || household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const plans = await prisma.plan.findMany({
      where: { householdId: hid },
      include: {
        scenarios: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(plans)
  } catch (error) {
    console.error('List plans error:', error)
    res.status(500).json({ error: 'Failed to list plans' })
  }
})

/**
 * POST /households/:hid/plans
 * Create a new plan with base scenario
 */
router.post('/households/:hid/plans', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { hid } = req.params
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Plan name is required' })
  }

  try {
    // Check household authorization
    const household = await prisma.household.findUnique({
      where: { id: hid },
    })

    if (!household || household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // Get latest ruleset
    const ruleset = await prisma.ruleset.findFirst({
      where: { orgId: req.user.orgId, publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
    })

    const plan = await prisma.plan.create({
      data: {
        name,
        householdId: hid,
        rulesetId: ruleset?.id,
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

    res.status(201).json(plan)
  } catch (error) {
    console.error('Create plan error:', error)
    res.status(500).json({ error: 'Failed to create plan' })
  }
})

/**
 * GET /plans/:id
 * Get plan with scenarios
 */
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      include: {
        household: true,
        scenarios: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' })
    }

    // Check authorization
    const household = await prisma.household.findUnique({
      where: { id: plan.householdId },
    })

    if (!household || household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json(plan)
  } catch (error) {
    console.error('Get plan error:', error)
    res.status(500).json({ error: 'Failed to fetch plan' })
  }
})

/**
 * PATCH /plans/:id/workflow
 * Update plan workflow state
 */
router.patch('/:id/workflow', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params
  const { workflowState } = req.body

  if (!workflowState) {
    return res.status(400).json({ error: 'Workflow state is required' })
  }

  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      include: { household: true },
    })

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' })
    }

    if (plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.plan.update({
      where: { id },
      data: { workflowState },
    })

    res.json(updated)
  } catch (error) {
    console.error('Update workflow error:', error)
    res.status(500).json({ error: 'Failed to update workflow' })
  }
})

/**
 * POST /plans/:pid/scenarios
 * Clone scenario
 */
router.post('/:pid/scenarios', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { pid } = req.params
  const { sourceScenarioId, name } = req.body

  if (!sourceScenarioId || !name) {
    return res.status(400).json({ error: 'Source scenario and name are required' })
  }

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: pid },
      include: { household: true },
    })

    if (!plan || plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const sourceScenario = await prisma.scenario.findUnique({
      where: { id: sourceScenarioId },
      include: {
        assets: true,
        liabilities: true,
        incomeStreams: true,
        expenseStreams: true,
        goals: true,
        retirementEvents: true,
        contribSchedules: true,
      },
    })

    if (!sourceScenario) {
      return res.status(404).json({ error: 'Source scenario not found' })
    }

    const newScenario = await prisma.scenario.create({
      data: {
        name,
        planId: pid,
        isBaseScenario: false,
        withdrawalStrategy: sourceScenario.withdrawalStrategy,
        assets: {
          create: sourceScenario.assets.map((a) => ({
            type: a.type,
            name: a.name,
            value: a.value,
            annualReturn: a.annualReturn,
          })),
        },
        liabilities: {
          create: sourceScenario.liabilities.map((l) => ({
            type: l.type,
            name: l.name,
            amount: l.amount,
            monthlyPayment: l.monthlyPayment,
            endYear: l.endYear,
          })),
        },
        incomeStreams: {
          create: sourceScenario.incomeStreams.map((i) => ({
            type: i.type,
            name: i.name,
            monthlyAmount: i.monthlyAmount,
            startAge: i.startAge,
            endAge: i.endAge,
            personId: i.personId,
          })),
        },
        expenseStreams: {
          create: sourceScenario.expenseStreams.map((e) => ({
            category: e.category,
            monthlyAmount: e.monthlyAmount,
          })),
        },
        goals: {
          create: sourceScenario.goals.map((g) => ({
            name: g.name,
            targetAmount: g.targetAmount,
            targetAge: g.targetAge,
          })),
        },
        retirementEvents: {
          create: sourceScenario.retirementEvents.map((r) => ({
            personId: r.personId,
            triggerAge: r.triggerAge,
          })),
        },
        contribSchedules: {
          create: sourceScenario.contribSchedules.map((c) => ({
            assetId: c.assetId,
            monthlyAmount: c.monthlyAmount,
            startAge: c.startAge,
            endAge: c.endAge,
          })),
        },
      },
    })

    res.status(201).json(newScenario)
  } catch (error) {
    console.error('Clone scenario error:', error)
    res.status(500).json({ error: 'Failed to clone scenario' })
  }
})

/**
 * GET /scenarios/:id
 * Get scenario with all financial data
 */
router.get('/scenarios/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    const scenario = await prisma.scenario.findUnique({
      where: { id },
      include: {
        plan: {
          include: {
            household: true,
          },
        },
        assets: true,
        liabilities: true,
        incomeStreams: {
          include: { person: true },
        },
        expenseStreams: true,
        goals: true,
        retirementEvents: {
          include: { person: true },
        },
        contribSchedules: {
          include: { asset: true },
        },
      },
    })

    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' })
    }

    // Check authorization
    if (scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json(scenario)
  } catch (error) {
    console.error('Get scenario error:', error)
    res.status(500).json({ error: 'Failed to fetch scenario' })
  }
})

export default router
