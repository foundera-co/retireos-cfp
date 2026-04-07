import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: 'CLIENT' | 'ADVISOR' | 'ADMIN'
    orgId: string
  }
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'No token provided' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as any
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      orgId: decoded.orgId,
    }
    next()
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' })
  }
}

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized', message: 'No user' })
      return
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden', message: 'Insufficient permissions' })
      return
    }

    next()
  }
}
