import axios from 'axios';
const client = axios.create({
    baseURL: '/api',
});
// Request interceptor to add auth token
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Response interceptor to handle auth errors
client.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
// Auth endpoints
export const authApi = {
    login: async (email, password) => {
        const response = await client.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    },
    logout: async () => {
        await client.post('/auth/logout');
    },
    getMe: async () => {
        const response = await client.get('/auth/me');
        return response.data;
    },
};
// Household endpoints
export const householdsApi = {
    list: async () => {
        const response = await client.get('/households');
        return response.data;
    },
    create: async (name, persons) => {
        const response = await client.post('/households', { name, persons });
        return response.data;
    },
    get: async (id) => {
        const response = await client.get(`/households/${id}`);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/households/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/households/${id}`);
    },
};
// Plan endpoints
export const plansApi = {
    listByHousehold: async (householdId) => {
        const response = await client.get(`/plans/households/${householdId}/plans`);
        return response.data;
    },
    create: async (householdId, name) => {
        const response = await client.post(`/plans/households/${householdId}/plans`, {
            name,
        });
        return response.data;
    },
    get: async (id) => {
        const response = await client.get(`/plans/${id}`);
        return response.data;
    },
    updateWorkflow: async (id, workflowState) => {
        const response = await client.patch(`/plans/${id}/workflow`, {
            workflowState,
        });
        return response.data;
    },
    cloneScenario: async (planId, sourceScenarioId, name) => {
        const response = await client.post(`/plans/${planId}/scenarios`, {
            sourceScenarioId,
            name,
        });
        return response.data;
    },
};
// Scenario endpoints
export const scenariosApi = {
    get: async (id) => {
        const response = await client.get(`/plans/scenarios/${id}`);
        return response.data;
    },
};
// Asset endpoints
export const assetsApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/assets`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/assets`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/financials/assets/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/assets/${id}`);
    },
};
// Liability endpoints
export const liabilitiesApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/liabilities`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/liabilities`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/financials/liabilities/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/liabilities/${id}`);
    },
};
// Income Stream endpoints
export const incomeStreamsApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/income-streams`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/income-streams`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/financials/income-streams/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/income-streams/${id}`);
    },
};
// Expense Stream endpoints
export const expenseStreamsApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/expense-streams`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/expense-streams`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/financials/expense-streams/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/expense-streams/${id}`);
    },
};
// Goal endpoints
export const goalsApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/goals`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/goals`, data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await client.patch(`/financials/goals/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/goals/${id}`);
    },
};
// Retirement Event endpoints
export const retirementEventsApi = {
    list: async (scenarioId) => {
        const response = await client.get(`/financials/scenarios/${scenarioId}/retirement-events`);
        return response.data;
    },
    create: async (scenarioId, data) => {
        const response = await client.post(`/financials/scenarios/${scenarioId}/retirement-events`, data);
        return response.data;
    },
    delete: async (id) => {
        await client.delete(`/financials/retirement-events/${id}`);
    },
};
// Simulation endpoints
export const simulationApi = {
    run: async (scenarioId) => {
        const response = await client.post(`/simulation/scenarios/${scenarioId}/run`);
        return response.data;
    },
    getRun: async (runId) => {
        const response = await client.get(`/simulation/runs/${runId}`);
        return response.data;
    },
    getStatus: async (runId) => {
        const response = await client.get(`/simulation/runs/${runId}/status`);
        return response.data;
    },
};
// Admin endpoints
export const adminApi = {
    listRulesets: async () => {
        const response = await client.get('/admin/rulesets');
        return response.data;
    },
    createRuleset: async (year, taxRules, niRules) => {
        const response = await client.post('/admin/rulesets', {
            year,
            taxRules,
            niRules,
        });
        return response.data;
    },
    publishRuleset: async (id) => {
        const response = await client.patch(`/admin/rulesets/${id}/publish`);
        return response.data;
    },
    listUsers: async () => {
        const response = await client.get('/admin/users');
        return response.data;
    },
    updateUserRole: async (id, role) => {
        const response = await client.patch(`/admin/users/${id}/role`, { role });
        return response.data;
    },
};
