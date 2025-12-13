import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Newspaper,
    Trophy,
    Medal,
    Home,
    History,
    Users2,
    ShoppingBag,
    Briefcase,
    Flag
} from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/drivers', icon: Users, label: 'Drivers' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/news', icon: Newspaper, label: 'News' },
    { to: '/results', icon: Trophy, label: 'Results' },
    { to: '/standings', icon: Medal, label: 'Standings' },
    { to: '/home', icon: Home, label: 'Home Carousel' },
    { to: '/heritage', icon: Flag, label: 'Heritage' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/partners', icon: Users2, label: 'Partners' },
    { to: '/store', icon: ShoppingBag, label: 'Store' },
    { to: '/careers', icon: Briefcase, label: 'Careers' },
];

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h1>🏎️ FERRARI</h1>
                    <span>Admin Panel</span>
                </div>
                <nav>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
