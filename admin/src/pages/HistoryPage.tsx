import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface HistoryItem { id: number; year_history: number; title_history: string; description: string; status: string; }
const emptyItem = { year_history: 2025, title_history: '', description: '', status: '' };

export default function HistoryPage() {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HistoryItem | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { setLoading(true); const res = await api.getHistory(); if (res.success && res.data) setItems(res.data as HistoryItem[]); setLoading(false); };
    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: HistoryItem) => { setEditing(item); setFormData({ year_history: item.year_history || 2025, title_history: item.title_history || '', description: item.description || '', status: item.status || '' }); setShowModal(true); };
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = editing ? await api.updateHistory(editing.id, formData) : await api.createHistory(formData); if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); } else setMessage({ type: 'error', text: 'Error' }); setTimeout(() => setMessage(null), 3000); };
    const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; const res = await api.deleteHistory(id); if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); } setTimeout(() => setMessage(null), 3000); };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">History</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table"><thead><tr><th>Year</th><th>Title</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (<tr key={item.id}><td>{item.year_history}</td><td>{item.title_history}</td><td>{item.status}</td>
                            <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Year</label><input type="number" value={formData.year_history} onChange={(e) => setFormData({ ...formData, year_history: parseInt(e.target.value) || 2025 })} /></div>
                        <div className="form-group"><label>Title</label><input type="text" value={formData.title_history} onChange={(e) => setFormData({ ...formData, title_history: e.target.value })} required /></div>
                        <div className="form-group"><label>Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                        <div className="form-group"><label>Status</label><input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
