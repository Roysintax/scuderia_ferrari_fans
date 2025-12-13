import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Career { id: number; position_worker: string; position_operation: string; description_title: string; }
const emptyItem = { position_worker: '', position_operation: '', description_title: '' };

export default function CareersPage() {
    const [items, setItems] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Career | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { setLoading(true); const res = await api.getCareers(); if (res.success && res.data) setItems(res.data as Career[]); setLoading(false); };
    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: Career) => { setEditing(item); setFormData({ position_worker: item.position_worker || '', position_operation: item.position_operation || '', description_title: item.description_title || '' }); setShowModal(true); };
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = editing ? await api.updateCareer(editing.id, formData) : await api.createCareer(formData); if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); } else setMessage({ type: 'error', text: 'Error' }); setTimeout(() => setMessage(null), 3000); };
    const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; const res = await api.deleteCareer(id); if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); } setTimeout(() => setMessage(null), 3000); };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">Careers</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table"><thead><tr><th>ID</th><th>Position</th><th>Operation</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (<tr key={item.id}><td>{item.id}</td><td>{item.position_worker}</td><td>{item.position_operation}</td>
                            <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Position</label><input type="text" value={formData.position_worker} onChange={(e) => setFormData({ ...formData, position_worker: e.target.value })} required /></div>
                        <div className="form-group"><label>Operation</label><input type="text" value={formData.position_operation} onChange={(e) => setFormData({ ...formData, position_operation: e.target.value })} /></div>
                        <div className="form-group"><label>Description</label><textarea value={formData.description_title} onChange={(e) => setFormData({ ...formData, description_title: e.target.value })} /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
