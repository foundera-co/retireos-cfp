import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router = Router()

/**
 * Helper: Check scenario authorization
 */
async function checkScenarioAuth(scenarioId: string, orgId: string) {
  const scenario = await prisma.scenario.findUnique({
    where: { id: scenarioId },
    include: {
      plan: {
        include: { household: true },
      },
    },
  })

  if (!scenario || scenario.plan.household.orgId !== orgId) {
    return null
  }

  return scenario
}

// ===== ASSETS =====

/**
 * GET /scenarios/:scenarioId/assets
 */
router.get('/scenarios/:scenarioId/assets', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const assets = await prisma.asset.findMany({
      where: { scenarioId },
    })

    res.json(assets)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
})

/**
 * POST /scenarios/:scenarioId/assets
 */
router.post('/scenarios/:scenarioId/assets', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { type, name, value, annualReturn } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const asset = await prisma.asset.create({
      data: {
        scenarioId,
        type,
        name,
        value,
        annualReturn: annualReturn || 0,
      },
    })

    res.status(201).json(asset)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create asset' })
  }
})

/**
 * PATCH /assets/:id
 */
router.patch('/assets/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!asset || asset.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.asset.update({
      where: { id },
      data: req.body,
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update asset' })
  }
})

/**
 * DELETE /assets/:id
 */
router.delete('/assets/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const asset = await prisma.asset.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!asset || asset.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.asset.delete({
      where: { id },
    })

    res.json({ message: 'Asset deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' })
  }
})

// ===== LIABILITIES =====

/**
 * GET /scenarios/:scenarioId/liabilities
 */
router.get('/scenarios/:scenarioId/liabilities', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const liabilities = await prisma.liability.findMany({
      where: { scenarioId },
    })

    res.json(liabilities)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch liabilities' })
  }
})

/**
 * POST /scenarios/:scenarioId/liabilities
 */
router.post('/scenarios/:scenarioId/liabilities', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { type, name, amount, monthlyPayment, endYear } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const liability = await prisma.liability.create({
      data: {
        scenarioId,
        type,
        name,
        amount,
        monthlyPayment: monthlyPayment || 0,
        endYear,
      },
    })

    res.status(201).json(liability)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create liability' })
  }
})

/**
 * PATCH /liabilities/:id
 */
router.patch('/liabilities/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const liability = await prisma.liability.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!liability || liability.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.liability.update({
      where: { id },
      data: req.body,
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update liability' })
  }
})

/**
 * DELETE /liabilities/:id
 */
router.delete('/liabilities/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const liability = await prisma.liability.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!liability || liability.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.liability.delete({
      where: { id },
    })

    res.json({ message: 'Liability deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete liability' })
  }
})

// ===== INCOME STREAMS =====

/**
 * GET /scenarios/:scenarioId/income-streams
 */
router.get('/scenarios/:scenarioId/income-streams', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const streams = await prisma.incomeStream.findMany({
      where: { scenarioId },
      include: { person: true },
    })

    res.json(streams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch income streams' })
  }
})

/**
 * POST /scenarios/:scenarioId/income-streams
 */
router.post('/scenarios/:scenarioId/income-streams', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { type, name, monthlyAmount, startAge, endAge, personId } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const stream = await prisma.incomeStream.create({
      data: {
        scenarioId,
        type,
        name,
        monthlyAmount,
        startAge,
        endAge,
        personId,
      },
    })

    res.status(201).json(stream)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create income stream' })
  }
})

/**
 * PATCH /income-streams/:id
 */
router.patch('/income-streams/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const stream = await prisma.incomeStream.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!stream || stream.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.incomeStream.update({
      where: { id },
      data: req.body,
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update income stream' })
  }
})

/**
 * DELETE /income-streams/:id
 */
router.delete('/income-streams/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const stream = await prisma.incomeStream.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!stream || stream.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.incomeStream.delete({
      where: { id },
    })

    res.json({ message: 'Income stream deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete income stream' })
  }
})

// ===== EXPENSE STREAMS =====

/**
 * GET /scenarios/:scenarioId/expense-streams
 */
router.get('/scenarios/:scenarioId/expense-streams', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const streams = await prisma.expenseStream.findMany({
      where: { scenarioId },
    })

    res.json(streams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense streams' })
  }
})

/**
 * POST /scenarios/:scenarioId/expense-streams
 */
router.post('/scenarios/:scenarioId/expense-streams', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { category, monthlyAmount } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const stream = await prisma.expenseStream.create({
      data: {
        scenarioId,
        category,
        monthlyAmount,
      },
    })

    res.status(201).json(stream)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense stream' })
  }
})

/**
 * PATCH /expense-streams/:id
 */
router.patch('/expense-streams/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const stream = await prisma.expenseStream.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!stream || stream.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.expenseStream.update({
      where: { id },
      data: req.body,
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense stream' })
  }
})

/**
 * DELETE /expense-streams/:id
 */
router.delete('/expense-streams/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const stream = await prisma.expenseStream.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!stream || stream.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.expenseStream.delete({
      where: { id },
    })

    res.json({ message: 'Expense stream deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense stream' })
  }
})

// ===== GOALS =====

/**
 * GET /scenarios/:scenarioId/goals
 */
router.get('/scenarios/:scenarioId/goals', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const goals = await prisma.goal.findMany({
      where: { scenarioId },
    })

    res.json(goals)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals' })
  }
})

/**
 * POST /scenarios/:scenarioId/goals
 */
router.post('/scenarios/:scenarioId/goals', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { name, targetAmount, targetAge } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const goal = await prisma.goal.create({
      data: {
        scenarioId,
        name,
        targetAmount,
        targetAge,
      },
    })

    res.status(201).json(goal)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal' })
  }
})

/**
 * PATCH /goals/:id
 */
router.patch('/goals/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const goal = await prisma.goal.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!goal || goal.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.goal.update({
      where: { id },
      data: req.body,
    })

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update goal' })
  }
})

/**
 * DELETE /goals/:id
 */
router.delete('/goals/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const goal = await prisma.goal.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!goal || goal.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.goal.delete({
      where: { id },
    })

    res.json({ message: 'Goal deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete goal' })
  }
})

// ===== RETIREMENT EVENTS =====

/**
 * GET /scenarios/:scenarioId/retirement-events
 */
router.get('/scenarios/:scenarioId/retirement-events', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const events = await prisma.retirementEvent.findMany({
      where: { scenarioId },
      include: { person: true },
    })

    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch retirement events' })
  }
})

/**
 * POST /scenarios/:scenarioId/retirement-events
 */
router.post('/scenarios/:scenarioId/retirement-events', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { personId, triggerAge } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const event = await prisma.retirementEvent.create({
      data: {
        scenarioId,
        personId,
        triggerAge,
      },
    })

    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create retirement event' })
  }
})

/**
 * DELETE /retirement-events/:id
 */
router.delete('/retirement-events/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const event = await prisma.retirementEvent.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!event || event.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.retirementEvent.delete({
      where: { id },
    })

    res.json({ message: 'Retirement event deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete retirement event' })
  }
})

// ===== CONTRIBUTION SCHEDULES =====

/**
 * GET /scenarios/:scenarioId/contrib-schedules
 */
router.get('/scenarios/:scenarioId/contrib-schedules', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const schedules = await prisma.contribSchedule.findMany({
      where: { scenarioId },
      include: { asset: true },
    })

    res.json(schedules)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contribution schedules' })
  }
})

/**
 * POST /scenarios/:scenarioId/contrib-schedules
 */
router.post('/scenarios/:scenarioId/contrib-schedules', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { scenarioId } = req.params
  const { assetId, monthlyAmount, startAge, endAge } = req.body

  try {
    const scenario = await checkScenarioAuth(scenarioId, req.user.orgId)
    if (!scenario) return res.status(403).json({ error: 'Forbidden' })

    const schedule = await prisma.contribSchedule.create({
      data: {
        scenarioId,
        assetId,
        monthlyAmount,
        startAge,
        endAge,
      },
    })

    res.status(201).json(schedule)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contribution schedule' })
  }
})

/**
 * DELETE /contrib-schedules/:id
 */
router.delete('/contrib-schedules/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params

  try {
    const schedule = await prisma.contribSchedule.findUnique({
      where: { id },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
      },
    })

    if (!schedule || schedule.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.contribSchedule.delete({
      where: { id },
    })

    res.json({ message: 'Contribution schedule deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contribution schedule' })
  }
})

export default router
