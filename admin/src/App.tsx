import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DriversPage from './pages/DriversPage';
import CalendarPage from './pages/CalendarPage';
import NewsPage from './pages/NewsPage';
import ResultsPage from './pages/ResultsPage';
import StandingsPage from './pages/StandingsPage';
import HomePage from './pages/HomePage';
import HeritagePage from './pages/HeritagePage';
import HistoryPage from './pages/HistoryPage';
import PartnersPage from './pages/PartnersPage';
import StorePage from './pages/StorePage';
import CareersPage from './pages/CareersPage';
import RacingPage from './pages/RacingPage';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/drivers" element={<DriversPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/standings" element={<StandingsPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/heritage" element={<HeritagePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/racing" element={<RacingPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
