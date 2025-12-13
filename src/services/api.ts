// API Service for connecting React frontend to Node.js backend

const API_BASE_URL = 'http://localhost:5000/api';

// Types for API responses
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

// Database types based on f1pages.sql schema
export interface HomeData {
    id: number;
    image_carrousel: string;
    year_season: number;
    title_text: string;
    description_short: string;
    link_explore: string;
    link_watch: string;
}

export interface Driver {
    id: number;
    image_driver: string;
    locate_driver: string;
    title_total: number;
    podium_total: number;
    race_total: number;
    link_instagram: string;
    link_twitter: string;
    link_facebook: string;
}

export interface Calendar {
    id: number;
    number_list_race: number;
    title_race: string;
    location_race: string;
    date_race: string;
    name_circuit: string;
}

export interface Result {
    id: number;
    image_card: string;
    round_number: number;
    title_circuit: string;
    race_time: string;
    champ_point: number;
    status: string;
    driver: string;
}

export interface Standing {
    id: number;
    position_race: number;
    name_driver: string;
    team_race: string;
    win_score: number;
    point_score: number;
}

export interface News {
    id: number;
    image_card: string;
    date_released: string;
    title_news: string;
    description: string;
    link_readmore: string;
}

export interface Heritage {
    id: number;
    constructors_total: number;
    drivers_champ_total: number;
    grand_prix_victories_total: number;
    year_racing_total: number;
    link_discover: string;
}

export interface History {
    id: number;
    year_history: number;
    title_history: string;
    description: string;
    status: string;
}

export interface Partner {
    id: number;
    logo_image: string;
    status_partner: string;
}

export interface StoreProduct {
    id: number;
    image_product: string;
    category_product: string;
    star_rating: number;
    price_product: number;
    cart_link: string;
}

export interface Career {
    id: number;
    position_worker: string;
    position_operation: string;
    description_title: string;
}

export interface Racing {
    id: number;
    title_season: string;
}

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

// API Functions
export const api = {
    // Health check
    healthCheck: () => fetchApi<{ message: string; database: string; timestamp: string }>('/health'),

    // Home
    getHome: () => fetchApi<HomeData[]>('/home'),

    // Drivers
    getDrivers: () => fetchApi<Driver[]>('/drivers'),
    getDriver: (id: number) => fetchApi<Driver>(`/drivers/${id}`),

    // Calendar
    getCalendar: () => fetchApi<Calendar[]>('/calendar'),

    // Results
    getResults: () => fetchApi<Result[]>('/results'),

    // Standings
    getStandings: () => fetchApi<Standing[]>('/standings'),

    // News
    getNews: () => fetchApi<News[]>('/news'),
    getNewsById: (id: number) => fetchApi<News>(`/news/${id}`),

    // Heritage
    getHeritage: () => fetchApi<Heritage[]>('/heritage'),

    // History
    getHistory: () => fetchApi<History[]>('/history'),

    // Partners
    getPartners: () => fetchApi<Partner[]>('/partners'),

    // Store
    getStore: () => fetchApi<StoreProduct[]>('/store'),

    // Careers
    getCareers: () => fetchApi<Career[]>('/careers'),

    // Racing
    getRacing: () => fetchApi<Racing[]>('/racing'),
};

export default api;
