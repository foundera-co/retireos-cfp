import { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  details?: any
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[ERROR] ${statusCode}: ${message}`, err.details || '')

  res.status(statusCode).json({
    error: message,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { details: err.details }),
  })
}
