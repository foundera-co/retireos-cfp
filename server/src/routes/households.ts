import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth, requireRole } from '../middleware/auth'

const router = Router()

/**
 * GET /households
 * List households for the user's organization
 */
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const households = await prisma.household.findMany({
      where: { orgId: req.user.orgId },
      include: {
        persons: true,
        plans: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    res.json(households)
  } catch (error) {
    console.error('List households error:', error)
    res.status(500).json({ error: 'Failed to list households' })
  }
})

/**
 * POST /households
 * Create a new household with persons
 */
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { name, persons } = req.body

  if (!name || !persons || !Array.isArray(persons) || persons.length === 0) {
    return res.status(400).json({ error: 'Invalid input' })
  }

  try {
    const household = await prisma.household.create({
      data: {
        name,
        orgId: req.user.orgId,
        persons: {
          create: persons.map((p: any) => ({
            name: p.name,
            currentAge: p.currentAge,
            gender: p.gender,
            employmentStatus: p.employmentStatus || 'employed',
            retirementTargetAge: p.retirementTargetAge,
          })),
        },
      },
      include: {
        persons: true,
      },
    })

    res.status(201).json(household)
  } catch (error) {
    console.error('Create household error:', error)
    res.status(500).json({ error: 'Failed to create household' })
  }
})

/**
 * GET /households/:id
 * Get household with persons and latest plan
 */
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    const household = await prisma.household.findUnique({
      where: { id },
      include: {
        persons: true,
        plans: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            scenarios: {
              take: 1,
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    })

    if (!household) {
      return res.status(404).json({ error: 'Household not found' })
    }

    // Check authorization
    if (household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    res.json(household)
  } catch (error) {
    console.error('Get household error:', error)
    res.status(500).json({ error: 'Failed to fetch household' })
  }
})

/**
 * PATCH /households/:id
 * Update household
 */
router.patch('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params
  const { name } = req.body

  try {
    // Check authorization
    const household = await prisma.household.findUnique({
      where: { id },
    })

    if (!household) {
      return res.status(404).json({ error: 'Household not found' })
    }

    if (household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.household.update({
      where: { id },
      data: { name },
      include: {
        persons: true,
      },
    })

    res.json(updated)
  } catch (error) {
    console.error('Update household error:', error)
    res.status(500).json({ error: 'Failed to update household' })
  }
})

/**
 * DELETE /households/:id
 * Archive household
 */
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    // Check authorization
    const household = await prisma.household.findUnique({
      where: { id },
    })

    if (!household) {
      return res.status(404).json({ error: 'Household not found' })
    }

    if (household.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // Soft delete by marking as archived
    const updated = await prisma.household.update({
      where: { id },
      data: { archivedAt: new Date() },
    })

    res.json({ message: 'Household archived' })
  } catch (error) {
    console.error('Delete household error:', error)
    res.status(500).json({ error: 'Failed to delete household' })
  }
})

export default router
