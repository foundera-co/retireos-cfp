import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth } from '../middleware/auth'
import { runSimulation } from '../engines/simulation'

const router = Router()

/**
 * POST /scenarios/:id/run
 * Trigger simulation for a scenario
 */
router.post('/scenarios/:id/run', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id: scenarioId } = req.params

  try {
    // Check authorization
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId },
      include: {
        plan: {
          include: { household: true },
        },
      },
    })

    if (!scenario || scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // Run simulation
    const runId = await runSimulation(scenarioId, prisma)

    res.json({
      runId,
      status: 'running',
    })
  } catch (error) {
    console.error('Simulation error:', error)
    res.status(500).json({
      error: 'Simulation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

/**
 * GET /runs/:id
 * Get simulation run with year results and insights
 */
router.get('/runs/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id: runId } = req.params

  try {
    const run = await prisma.simulationRun.findUnique({
      where: { id: runId },
      include: {
        scenario: {
          include: {
            plan: {
              include: { household: true },
            },
          },
        },
        yearResults: {
          orderBy: { year: 'asc' },
        },
        insights: true,
      },
    })

    if (!run) {
      return res.status(404).json({ error: 'Run not found' })
    }

    // Check authorization
    if (run.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json(run)
  } catch (error) {
    console.error('Get run error:', error)
    res.status(500).json({ error: 'Failed to fetch run' })
  }
})

/**
 * GET /runs/:id/status
 * Get just the status of a simulation run
 */
router.get('/runs/:id/status', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id: runId } = req.params

  try {
    const run = await prisma.simulationRun.findUnique({
      where: { id: runId },
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

    if (!run) {
      return res.status(404).json({ error: 'Run not found' })
    }

    // Check authorization
    if (run.scenario.plan.household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json({
      runId: run.id,
      status: run.status,
      completedAt: run.completedAt,
    })
  } catch (error) {
    console.error('Get status error:', error)
    res.status(500).json({ error: 'Failed to fetch status' })
  }
})

export default router
