import axios, { AxiosInstance, AxiosError } from 'axios'
import * as types from '../types'

const client: AxiosInstance = axios.create({
  baseURL: '/api',
})

// Request interceptor to add auth token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle auth errors
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await client.post<{ token: string; user: types.User }>('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  logout: async () => {
    await client.post('/auth/logout')
  },

  getMe: async () => {
    const response = await client.get<types.User & { org: types.Org }>('/auth/me')
    return response.data
  },
}

// Household endpoints
export const householdsApi = {
  list: async () => {
    const response = await client.get<types.Household[]>('/households')
    return response.data
  },

  create: async (name: string, persons: any[]) => {
    const response = await client.post<types.Household>('/households', { name, persons })
    return response.data
  },

  get: async (id: string) => {
    const response = await client.get<types.Household>(`/households/${id}`)
    return response.data
  },

  update: async (id: string, data: Partial<types.Household>) => {
    const response = await client.patch<types.Household>(`/households/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/households/${id}`)
  },
}

// Plan endpoints
export const plansApi = {
  listByHousehold: async (householdId: string) => {
    const response = await client.get<types.Plan[]>(`/plans/households/${householdId}/plans`)
    return response.data
  },

  create: async (householdId: string, name: string) => {
    const response = await client.post<types.Plan>(`/plans/households/${householdId}/plans`, {
      name,
    })
    return response.data
  },

  get: async (id: string) => {
    const response = await client.get<types.Plan>(`/plans/${id}`)
    return response.data
  },

  updateWorkflow: async (id: string, workflowState: types.PlanWorkflowState) => {
    const response = await client.patch<types.Plan>(`/plans/${id}/workflow`, {
      workflowState,
    })
    return response.data
  },

  cloneScenario: async (planId: string, sourceScenarioId: string, name: string) => {
    const response = await client.post<types.Scenario>(`/plans/${planId}/scenarios`, {
      sourceScenarioId,
      name,
    })
    return response.data
  },
}

// Scenario endpoints
export const scenariosApi = {
  get: async (id: string) => {
    const response = await client.get<types.Scenario>(`/plans/scenarios/${id}`)
    return response.data
  },
}

// Asset endpoints
export const assetsApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.Asset[]>(`/financials/scenarios/${scenarioId}/assets`)
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.Asset, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.Asset>(`/financials/scenarios/${scenarioId}/assets`, data)
    return response.data
  },

  update: async (id: string, data: Partial<types.Asset>) => {
    const response = await client.patch<types.Asset>(`/financials/assets/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/assets/${id}`)
  },
}

// Liability endpoints
export const liabilitiesApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.Liability[]>(`/financials/scenarios/${scenarioId}/liabilities`)
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.Liability, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.Liability>(
      `/financials/scenarios/${scenarioId}/liabilities`,
      data
    )
    return response.data
  },

  update: async (id: string, data: Partial<types.Liability>) => {
    const response = await client.patch<types.Liability>(`/financials/liabilities/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/liabilities/${id}`)
  },
}

// Income Stream endpoints
export const incomeStreamsApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.IncomeStream[]>(
      `/financials/scenarios/${scenarioId}/income-streams`
    )
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.IncomeStream, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.IncomeStream>(
      `/financials/scenarios/${scenarioId}/income-streams`,
      data
    )
    return response.data
  },

  update: async (id: string, data: Partial<types.IncomeStream>) => {
    const response = await client.patch<types.IncomeStream>(
      `/financials/income-streams/${id}`,
      data
    )
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/income-streams/${id}`)
  },
}

// Expense Stream endpoints
export const expenseStreamsApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.ExpenseStream[]>(
      `/financials/scenarios/${scenarioId}/expense-streams`
    )
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.ExpenseStream, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.ExpenseStream>(
      `/financials/scenarios/${scenarioId}/expense-streams`,
      data
    )
    return response.data
  },

  update: async (id: string, data: Partial<types.ExpenseStream>) => {
    const response = await client.patch<types.ExpenseStream>(
      `/financials/expense-streams/${id}`,
      data
    )
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/expense-streams/${id}`)
  },
}

// Goal endpoints
export const goalsApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.Goal[]>(`/financials/scenarios/${scenarioId}/goals`)
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.Goal, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.Goal>(`/financials/scenarios/${scenarioId}/goals`, data)
    return response.data
  },

  update: async (id: string, data: Partial<types.Goal>) => {
    const response = await client.patch<types.Goal>(`/financials/goals/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/goals/${id}`)
  },
}

// Retirement Event endpoints
export const retirementEventsApi = {
  list: async (scenarioId: string) => {
    const response = await client.get<types.RetirementEvent[]>(
      `/financials/scenarios/${scenarioId}/retirement-events`
    )
    return response.data
  },

  create: async (scenarioId: string, data: Omit<types.RetirementEvent, 'id' | 'scenarioId' | 'createdAt'>) => {
    const response = await client.post<types.RetirementEvent>(
      `/financials/scenarios/${scenarioId}/retirement-events`,
      data
    )
    return response.data
  },

  delete: async (id: string) => {
    await client.delete(`/financials/retirement-events/${id}`)
  },
}

// Simulation endpoints
export const simulationApi = {
  run: async (scenarioId: string) => {
    const response = await client.post<{ runId: string; status: string }>(
      `/simulation/scenarios/${scenarioId}/run`
    )
    return response.data
  },

  getRun: async (runId: string) => {
    const response = await client.get<types.SimulationRun>(`/simulation/runs/${runId}`)
    return response.data
  },

  getStatus: async (runId: string) => {
    const response = await client.get<{ runId: string; status: string; completedAt?: Date }>(
      `/simulation/runs/${runId}/status`
    )
    return response.data
  },
}

// Admin endpoints
export const adminApi = {
  listRulesets: async () => {
    const response = await client.get<types.Ruleset[]>('/admin/rulesets')
    return response.data
  },

  createRuleset: async (year: number, taxRules: any[], niRules: any[]) => {
    const response = await client.post<types.Ruleset>('/admin/rulesets', {
      year,
      taxRules,
      niRules,
    })
    return response.data
  },

  publishRuleset: async (id: string) => {
    const response = await client.patch<types.Ruleset>(`/admin/rulesets/${id}/publish`)
    return response.data
  },

  listUsers: async () => {
    const response = await client.get<types.User[]>('/admin/users')
    return response.data
  },

  updateUserRole: async (id: string, role: types.UserRole) => {
    const response = await client.patch<types.User>(`/admin/users/${id}/role`, { role })
    return response.data
  },
}
