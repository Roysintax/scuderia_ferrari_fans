import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface NewsItem {
    id: number;
    image_card: string;
    date_released: string;
    title_news: string;
    description: string;
    link_readmore: string;
}

const emptyNews = {
    image_card: '',
    date_released: '',
    title_news: '',
    description: '',
    link_readmore: '',
};

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<NewsItem | null>(null);
    const [formData, setFormData] = useState(emptyNews);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await api.getNews();
        if (res.success && res.data) setNews(res.data as NewsItem[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyNews); setShowModal(true); };
    const openEdit = (item: NewsItem) => {
        setEditing(item);
        setFormData({
            image_card: item.image_card || '',
            date_released: item.date_released?.split('T')[0] || '',
            title_news: item.title_news || '',
            description: item.description || '',
            link_readmore: item.link_readmore || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateNews(editing.id, formData) : await api.createNews(formData);
        if (res.success) {
            setMessage({ type: 'success', text: editing ? 'Updated!' : 'Created!' });
            setShowModal(false); loadData();
        } else setMessage({ type: 'error', text: res.message || 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this item?')) return;
        const res = await api.deleteNews(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        else setMessage({ type: 'error', text: res.message || 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">News</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add News</button>
            </div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : news.length === 0 ? (
                    <div className="empty-state"><h3>No news found</h3></div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Title</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {news.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title_news}</td>
                                    <td>{item.date_released?.split('T')[0]}</td>
                                    <td className="actions">
                                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit News' : 'Add News'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Title</label>
                                    <input type="text" value={formData.title_news} onChange={(e) => setFormData({ ...formData, title_news: e.target.value })} required /></div>
                                <div className="form-group"><label>Date</label>
                                    <input type="date" value={formData.date_released} onChange={(e) => setFormData({ ...formData, date_released: e.target.value })} /></div>
                                <div className="form-group"><label>Image URL</label>
                                    <input type="text" value={formData.image_card} onChange={(e) => setFormData({ ...formData, image_card: e.target.value })} /></div>
                                <div className="form-group"><label>Description</label>
                                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                                <div className="form-group"><label>Read More Link</label>
                                    <input type="text" value={formData.link_readmore} onChange={(e) => setFormData({ ...formData, link_readmore: e.target.value })} /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
