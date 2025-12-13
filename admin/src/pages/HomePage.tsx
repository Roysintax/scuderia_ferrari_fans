import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface HomeItem {
    id: number;
    image_carrousel: string;
    year_season: number;
    title_text: string;
    description_short: string;
    link_explore: string;
    link_watch: string;
}

const emptyItem = { image_carrousel: '', year_season: 2025, title_text: '', description_short: '', link_explore: '', link_watch: '' };

export default function HomePage() {
    const [items, setItems] = useState<HomeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HomeItem | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await api.getHome();
        if (res.success && res.data) setItems(res.data as HomeItem[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: HomeItem) => {
        setEditing(item);
        setFormData({
            image_carrousel: item.image_carrousel || '',
            year_season: item.year_season || 2025,
            title_text: item.title_text || '',
            description_short: item.description_short || '',
            link_explore: item.link_explore || '',
            link_watch: item.link_watch || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateHome(editing.id, formData) : await api.createHome(formData);
        if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); }
        else setMessage({ type: 'error', text: 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete?')) return;
        const res = await api.deleteHome(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Home Carousel</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Slide</button>
            </div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? (
                    <div className="empty-state"><h3>No slides found</h3></div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Title</th><th>Year</th><th>Actions</th></tr></thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title_text}</td>
                                    <td>{item.year_season}</td>
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
                        <div className="modal-header"><h2>{editing ? 'Edit Slide' : 'Add Slide'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Title</label>
                                    <input type="text" value={formData.title_text} onChange={(e) => setFormData({ ...formData, title_text: e.target.value })} required /></div>
                                <div className="form-group"><label>Year Season</label>
                                    <input type="number" value={formData.year_season} onChange={(e) => setFormData({ ...formData, year_season: parseInt(e.target.value) || 2025 })} /></div>
                                <div className="form-group"><label>Image URL</label>
                                    <input type="text" value={formData.image_carrousel} onChange={(e) => setFormData({ ...formData, image_carrousel: e.target.value })} /></div>
                                <div className="form-group"><label>Description</label>
                                    <textarea value={formData.description_short} onChange={(e) => setFormData({ ...formData, description_short: e.target.value })} /></div>
                                <div className="form-group"><label>Explore Link</label>
                                    <input type="text" value={formData.link_explore} onChange={(e) => setFormData({ ...formData, link_explore: e.target.value })} /></div>
                                <div className="form-group"><label>Watch Link</label>
                                    <input type="text" value={formData.link_watch} onChange={(e) => setFormData({ ...formData, link_watch: e.target.value })} /></div>
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
