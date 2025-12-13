import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Racing { id: number; title_season: string; }
const emptyItem = { title_season: '' };

export default function RacingPage() {
    const [items, setItems] = useState<Racing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Racing | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { setLoading(true); const res = await api.getRacing(); if (res.success && res.data) setItems(res.data as Racing[]); setLoading(false); };
    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: Racing) => { setEditing(item); setFormData({ title_season: item.title_season || '' }); setShowModal(true); };
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = editing ? await api.updateRacing(editing.id, formData) : await api.createRacing(formData); if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); } else setMessage({ type: 'error', text: 'Error' }); setTimeout(() => setMessage(null), 3000); };
    const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; const res = await api.deleteRacing(id); if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); } setTimeout(() => setMessage(null), 3000); };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">Racing Seasons</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table"><thead><tr><th>ID</th><th>Season Title</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (<tr key={item.id}><td>{item.id}</td><td>{item.title_season}</td>
                            <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Season Title</label><input type="text" value={formData.title_season} onChange={(e) => setFormData({ ...formData, title_season: e.target.value })} required /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
