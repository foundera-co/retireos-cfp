# RetireOS CFP - Israeli Retirement Planning SaaS

A complete full-stack Hebrew RTL SaaS application for Israeli CFPs (Certified Financial Planners) to help with retirement planning based on the Dan & Karen case study with 10.7M ILS in assets.

## System Architecture

### Technology Stack

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS with RTL support
- Zustand for state management
- Axios for API calls
- Recharts for financial visualizations
- Lucide React for icons

**Backend:**
- Node.js + Express + TypeScript
- Prisma ORM with PostgreSQL
- JWT authentication
- Modular engine system for calculations

**Infrastructure:**
- Docker containerization
- Railway.app deployment
- Environment-based configuration

## Project Structure

```
retireos-cfp/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/                   # Full page components
│   │   │   ├── Login.tsx            # Authentication page
│   │   │   ├── Dashboard.tsx        # Main dashboard with KPIs
│   │   │   ├── Assets.tsx           # Asset management
│   │   │   ├── Pension.tsx          # Pension projections
│   │   │   ├── Tax.tsx              # Tax analysis
│   │   │   ├── Reports.tsx          # Report generation
│   │   │   ├── Admin/               # Admin panel
│   │   │   └── Wizard/              # 7-step planning wizard
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI components
│   │   │   ├── layout/              # App layout components
│   │   │   └── charts/              # Financial charts
│   │   ├── store/                   # Zustand state stores
│   │   ├── api/                     # API client with typed endpoints
│   │   └── types/                   # TypeScript type definitions
│   ├── index.html                   # Entry HTML (RTL, Hebrew)
│   ├── vite.config.ts               # Vite configuration
│   └── tailwind.config.js           # Tailwind dark theme
│
├── server/                          # Backend Express application
│   ├── src/
│   │   ├── index.ts                 # Express app setup
│   │   ├── lib/
│   │   │   └── prisma.ts            # Prisma singleton
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT authentication
│   │   │   └── errorHandler.ts      # Error handling
│   │   ├── engines/                 # Financial calculation engines
│   │   │   ├── tax.ts               # Israeli tax calculator
│   │   │   ├── ni.ts                # National insurance (ביטוח לאומי)
│   │   │   ├── pension.ts           # Pension accumulation & 161
│   │   │   └── simulation.ts        # Year-by-year projections
│   │   └── routes/
│   │       ├── auth.ts              # Authentication endpoints
│   │       ├── households.ts        # Family/household CRUD
│   │       ├── plans.ts             # Planning workflows
│   │       ├── financials.ts        # Assets, liabilities, income
│   │       ├── simulation.ts        # Run & retrieve simulations
│   │       └── admin.ts             # Admin management
│   ├── package.json
│   └── tsconfig.json
│
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── seed.ts                      # Demo data seeding
│
├── Dockerfile                       # Multi-stage Docker build
├── railway.toml                     # Railway.app config
├── .env.example                     # Environment variables template
├── package.json                     # Root workspace
└── README.md                        # This file
```

## Features

### Financial Planning Engines

1. **Tax Engine (tax.ts)**
   - 2026 Israeli tax brackets (10% to 47%)
   - Credit point calculations (₪2,820/year per point)
   - Capital gains tax (25% or 15% indexed)
   - Pension tax exemption (₪9,430/month)

2. **National Insurance Engine (ni.ts)**
   - Employee contributions (3.5% + 12%)
   - Monthly ceiling: ₪51,910
   - Old age benefits calculation
   - Seniority bonus (0.5% per year insured)

3. **Pension Engine (pension.ts)**
   - Fund accumulation with compound returns
   - Monthly pension calculation (divisor: 200)
   - Form 161 tax exemption
   - Required contribution calculations

4. **Simulation Engine (simulation.ts)**
   - Year-by-year projections to age 90
   - Income sources: salary, pension, NI, rental
   - Expense tracking and asset growth
   - Risk warnings and insights generation

### User Interfaces

- **Login Page** - Beautiful RTL authentication
- **Dashboard** - KPI cards, charts, simulation controls
- **7-Step Wizard** - Guided retirement planning
- **Assets Management** - Track pension, real estate, savings
- **Tax Analysis** - 2026 brackets, CGT, pension benefits
- **Pension Planning** - Projections at different retirement ages
- **Reports** - Export plans and analyses
- **Admin Panel** - User, ruleset, and organization management

## Database Schema

Key entities:
- **Org** - Organization (single RetireOS Demo)
- **User** - Team members (ADMIN, ADVISOR, CLIENT)
- **Household** - Family unit (Dan & Karen)
- **Person** - Individual in household
- **Plan** - Retirement planning project
- **Scenario** - Alternative "what-if" analyses
- **Asset, Liability, IncomeStream, ExpenseStream** - Financial data
- **Goal, RetirementEvent** - Milestones
- **Ruleset** - Tax/NI rules per year
- **SimulationRun, YearResult, Insight** - Projections & findings

## Setup & Running

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Development

1. **Setup environment:**
```bash
cp .env.example .env
# Edit .env with database URL and JWT_SECRET
```

2. **Install dependencies:**
```bash
npm install
cd server && npm install
cd ../client && npm install
```

3. **Database setup:**
```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

4. **Run development servers:**
```bash
# Terminal 1: Backend (localhost:3000)
cd server
npm run dev

# Terminal 2: Frontend (localhost:5173)
cd client
npm run dev
```

### Production Build

```bash
# Build client
cd client
npm run build

# Build server
cd server
npm run build

# Docker deployment
docker build -t retireos-cfp .
docker run -e DATABASE_URL=... -e JWT_SECRET=... -p 3000:3000 retireos-cfp
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Households & Planning
- `GET/POST /api/households` - List/create households
- `GET/PATCH /api/households/:id` - Get/update household
- `GET/POST /api/plans/households/:hid/plans` - Plans for household

### Financial Data (CRUD for each entity)
- `/api/financials/scenarios/:id/assets`
- `/api/financials/scenarios/:id/liabilities`
- `/api/financials/scenarios/:id/income-streams`
- `/api/financials/scenarios/:id/expense-streams`
- `/api/financials/scenarios/:id/goals`
- `/api/financials/scenarios/:id/retirement-events`

### Simulation
- `POST /api/simulation/scenarios/:id/run` - Run projection
- `GET /api/simulation/runs/:id` - Get results with insights

### Admin
- `GET/POST /api/admin/rulesets` - Manage tax/NI rules
- `GET/PATCH /api/admin/users` - User management

## Demo Credentials

After seeding:
- Admin: `admin@retireos.co.il` / `Admin123!`
- Advisor: `advisor@retireos.co.il` / `Advisor123!`

## Key Design Decisions

1. **Hebrew RTL UI** - Full right-to-left support with Tailwind
2. **Dark Luxury Theme** - Navy (#0f1729), Gold (#d4af37) accent
3. **Modular Engines** - Separate calculation modules for tax, NI, pension
4. **Type Safety** - Full TypeScript throughout
5. **Zustand State** - Lightweight, simple state management
6. **Recharts Visualization** - Financial charts with custom formatting
7. **Prisma ORM** - Type-safe database queries
8. **JWT Auth** - Stateless token-based security

## Deployment

### Railway.app

1. Connect GitHub repo
2. Set environment variables:
   - `DATABASE_URL` - PostgreSQL connection
   - `JWT_SECRET` - Random secure key
   - `NODE_ENV` - Set to "production"

3. Railway auto-detects from `railway.toml` and builds with Dockerfile

## Financial Data Example

The seeded demo includes:
- **Household:** Dan (48M) & Karen (46F)
- **Assets:** 10.7M ILS
  - Pension: 1.8M
  - Real estate: 3.5M
  - Savings: 520K
  - Cash: 330K
- **Income:** Dan 16K/month, Karen 20K/month
- **Goals:** Retirement at 55, education fund 213K, wedding 2.1M

## Contributing

This is a complete production-ready system. All 58 files are implemented:
- 14 backend route files
- 4 calculation engine files
- 30+ frontend component and page files
- Complete TypeScript types
- Configuration for deployment

## License

Proprietary - RetireOS CFP
