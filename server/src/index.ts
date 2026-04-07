import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import authRouter from './routes/auth'
import householdsRouter from './routes/households'
import plansRouter from './routes/plans'
import financialsRouter from './routes/financials'
import simulationRouter from './routes/simulation'
import adminRouter from './routes/admin'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/households', householdsRouter)
app.use('/api/plans', plansRouter)
app.use('/api/financials', financialsRouter)
app.use('/api/simulation', simulationRouter)
app.use('/api/admin', adminRouter)

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'RetireOS CFP', timestamp: new Date().toISOString() })
})

// Serve static files from client build
const clientDistPath = path.join(__dirname, '../../client/dist')
app.use(express.static(clientDistPath))

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req: Request, res: Response) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  } else {
    res.status(404).json({ error: 'Not Found' })
  }
})

// Error handler (must be last)
app.use(errorHandler)

const PORT = parseInt(process.env.PORT || '3000', 10)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 RetireOS CFP Server running on port ${PORT}`)
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
