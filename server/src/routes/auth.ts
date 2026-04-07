import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router = Router()

/**
 * POST /login
 * Authenticate user with email and password
 */
router.post('/login', async (req, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email and password are required',
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid email or password',
      })
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid email or password',
      })
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        orgId: user.orgId,
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        orgId: user.orgId,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to process login',
    })
  }
})

/**
 * POST /logout
 * Logout endpoint (stateless - client removes token)
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

/**
 * GET /me
 * Get current authenticated user
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No user',
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        orgId: true,
        org: {
          select: {
            id: true,
            name: true,
            timezone: true,
          },
        },
      },
    })

    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to fetch user',
    })
  }
})

export default router
