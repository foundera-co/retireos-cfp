import { Router, Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth, requireRole } from '../middleware/auth'

const router = Router()

/**
 * GET /admin/rulesets
 * List all rulesets in the organization
 */
router.get('/rulesets', requireAuth, requireRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const rulesets = await prisma.ruleset.findMany({
      where: { orgId: req.user.orgId },
      include: {
        taxRules: true,
        niRules: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(rulesets)
  } catch (error) {
    console.error('List rulesets error:', error)
    res.status(500).json({ error: 'Failed to list rulesets' })
  }
})

/**
 * POST /admin/rulesets
 * Create a new ruleset with tax and NI rules
 */
router.post('/rulesets', requireAuth, requireRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { year, taxRules, niRules } = req.body

  if (!year || !taxRules || !niRules) {
    return res.status(400).json({ error: 'Year, tax rules, and NI rules are required' })
  }

  try {
    const ruleset = await prisma.ruleset.create({
      data: {
        year,
        orgId: req.user.orgId,
        taxRules: {
          create: taxRules.map((rule: any) => ({
            ceiling: rule.ceiling,
            rate: rule.rate,
          })),
        },
        niRules: {
          create: niRules.map((rule: any) => ({
            name: rule.name,
            employeeRate: rule.employeeRate,
            employerRate: rule.employerRate,
            ceiling: rule.ceiling,
          })),
        },
      },
      include: {
        taxRules: true,
        niRules: true,
      },
    })

    res.status(201).json(ruleset)
  } catch (error) {
    console.error('Create ruleset error:', error)
    res.status(500).json({ error: 'Failed to create ruleset' })
  }
})

/**
 * PATCH /admin/rulesets/:id/publish
 * Publish a ruleset (make it active)
 */
router.patch('/rulesets/:id/publish', requireAuth, requireRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    const ruleset = await prisma.ruleset.findUnique({
      where: { id },
    })

    if (!ruleset || ruleset.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // Unpublish other rulesets for the same year
    await prisma.ruleset.updateMany({
      where: {
        orgId: req.user.orgId,
        year: ruleset.year,
        id: { not: id },
      },
      data: { publishedAt: null },
    })

    // Publish this ruleset
    const updated = await prisma.ruleset.update({
      where: { id },
      data: { publishedAt: new Date() },
      include: {
        taxRules: true,
        niRules: true,
      },
    })

    res.json(updated)
  } catch (error) {
    console.error('Publish ruleset error:', error)
    res.status(500).json({ error: 'Failed to publish ruleset' })
  }
})

/**
 * GET /admin/users
 * List all users in the organization
 */
router.get('/users', requireAuth, requireRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const users = await prisma.user.findMany({
      where: { orgId: req.user.orgId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(users)
  } catch (error) {
    console.error('List users error:', error)
    res.status(500).json({ error: 'Failed to list users' })
  }
})

/**
 * PATCH /admin/users/:id/role
 * Change a user's role
 */
router.patch('/users/:id/role', requireAuth, requireRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.params
  const { role } = req.body

  if (!role || !['CLIENT', 'ADVISOR', 'ADMIN'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user || user.orgId !== req.user.orgId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    res.json(updated)
  } catch (error) {
    console.error('Update user role error:', error)
    res.status(500).json({ error: 'Failed to update user role' })
  }
})

export default router
