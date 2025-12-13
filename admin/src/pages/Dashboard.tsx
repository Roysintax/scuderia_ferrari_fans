import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users, Calendar, Newspaper, Trophy, ShoppingBag, Users2 } from 'lucide-react';

interface Stats {
    drivers: number;
    calendar: number;
    news: number;
    results: number;
    store: number;
    partners: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats>({
        drivers: 0,
        calendar: 0,
        news: 0,
        results: 0,
        store: 0,
        partners: 0,
    });
    const [dbStatus, setDbStatus] = useState<string>('Checking...');

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const [health, drivers, calendar, news, results, store, partners] = await Promise.all([
            api.health(),
            api.getDrivers(),
            api.getCalendar(),
            api.getNews(),
            api.getResults(),
            api.getStore(),
            api.getPartners(),
        ]);

        setDbStatus(health.success ? '✅ Connected' : '❌ Disconnected');

        setStats({
            drivers: Array.isArray((drivers as any).data) ? (drivers as any).data.length : 0,
            calendar: Array.isArray((calendar as any).data) ? (calendar as any).data.length : 0,
            news: Array.isArray((news as any).data) ? (news as any).data.length : 0,
            results: Array.isArray((results as any).data) ? (results as any).data.length : 0,
            store: Array.isArray((store as any).data) ? (store as any).data.length : 0,
            partners: Array.isArray((partners as any).data) ? (partners as any).data.length : 0,
        });
    };

    const statCards = [
        { label: 'Drivers', value: stats.drivers, icon: Users },
        { label: 'Races', value: stats.calendar, icon: Calendar },
        { label: 'News', value: stats.news, icon: Newspaper },
        { label: 'Results', value: stats.results, icon: Trophy },
        { label: 'Products', value: stats.store, icon: ShoppingBag },
        { label: 'Partners', value: stats.partners, icon: Users2 },
    ];

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <div className="card" style={{ padding: '10px 16px' }}>
                    Database: {dbStatus}
                </div>
            </div>

            <div className="stats-grid">
                {statCards.map((stat) => (
                    <div key={stat.label} className="stat-card">
                        <div className="stat-icon">
                            <stat.icon size={24} color="white" />
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '16px' }}>Welcome to Ferrari Admin Panel</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Manage all content for the Scuderia Ferrari Fans website from this dashboard.
                    Use the sidebar navigation to access different sections.
                </p>
            </div>
        </div>
    );
}
