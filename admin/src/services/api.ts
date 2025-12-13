const API_BASE = 'http://localhost:5000/api';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

// Generic CRUD functions
async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`);
        return await res.json();
    } catch (error) {
        return { success: false, message: String(error) };
    }
}

async function post<T>(endpoint: string, data: object): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: String(error) };
    }
}

async function put<T>(endpoint: string, data: object): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: String(error) };
    }
}

async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
        return await res.json();
    } catch (error) {
        return { success: false, message: String(error) };
    }
}

// API exports for each table
export const api = {
    // Health
    health: () => get('/health'),

    // Drivers
    getDrivers: () => get('/drivers'),
    createDriver: (data: object) => post('/drivers', data),
    updateDriver: (id: number, data: object) => put(`/drivers/${id}`, data),
    deleteDriver: (id: number) => del(`/drivers/${id}`),

    // Calendar
    getCalendar: () => get('/calendar'),
    createCalendar: (data: object) => post('/calendar', data),
    updateCalendar: (id: number, data: object) => put(`/calendar/${id}`, data),
    deleteCalendar: (id: number) => del(`/calendar/${id}`),

    // News
    getNews: () => get('/news'),
    createNews: (data: object) => post('/news', data),
    updateNews: (id: number, data: object) => put(`/news/${id}`, data),
    deleteNews: (id: number) => del(`/news/${id}`),

    // Results
    getResults: () => get('/results'),
    createResult: (data: object) => post('/results', data),
    updateResult: (id: number, data: object) => put(`/results/${id}`, data),
    deleteResult: (id: number) => del(`/results/${id}`),

    // Standings
    getStandings: () => get('/standings'),
    createStanding: (data: object) => post('/standings', data),
    updateStanding: (id: number, data: object) => put(`/standings/${id}`, data),
    deleteStanding: (id: number) => del(`/standings/${id}`),

    // Home
    getHome: () => get('/home'),
    createHome: (data: object) => post('/home', data),
    updateHome: (id: number, data: object) => put(`/home/${id}`, data),
    deleteHome: (id: number) => del(`/home/${id}`),

    // Heritage
    getHeritage: () => get('/heritage'),
    createHeritage: (data: object) => post('/heritage', data),
    updateHeritage: (id: number, data: object) => put(`/heritage/${id}`, data),
    deleteHeritage: (id: number) => del(`/heritage/${id}`),

    // History
    getHistory: () => get('/history'),
    createHistory: (data: object) => post('/history', data),
    updateHistory: (id: number, data: object) => put(`/history/${id}`, data),
    deleteHistory: (id: number) => del(`/history/${id}`),

    // Partners
    getPartners: () => get('/partners'),
    createPartner: (data: object) => post('/partners', data),
    updatePartner: (id: number, data: object) => put(`/partners/${id}`, data),
    deletePartner: (id: number) => del(`/partners/${id}`),

    // Store
    getStore: () => get('/store'),
    createStore: (data: object) => post('/store', data),
    updateStore: (id: number, data: object) => put(`/store/${id}`, data),
    deleteStore: (id: number) => del(`/store/${id}`),

    // Careers
    getCareers: () => get('/careers'),
    createCareer: (data: object) => post('/careers', data),
    updateCareer: (id: number, data: object) => put(`/careers/${id}`, data),
    deleteCareer: (id: number) => del(`/careers/${id}`),

    // Racing
    getRacing: () => get('/racing'),
    createRacing: (data: object) => post('/racing', data),
    updateRacing: (id: number, data: object) => put(`/racing/${id}`, data),
    deleteRacing: (id: number) => del(`/racing/${id}`),
};
