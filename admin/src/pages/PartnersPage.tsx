import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Partner { id: number; logo_image: string; status_partner: string; }
const emptyItem = { logo_image: '', status_partner: '' };

export default function PartnersPage() {
    const [items, setItems] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Partner | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { setLoading(true); const res = await api.getPartners(); if (res.success && res.data) setItems(res.data as Partner[]); setLoading(false); };
    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: Partner) => { setEditing(item); setFormData({ logo_image: item.logo_image || '', status_partner: item.status_partner || '' }); setShowModal(true); };
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = editing ? await api.updatePartner(editing.id, formData) : await api.createPartner(formData); if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); } else setMessage({ type: 'error', text: 'Error' }); setTimeout(() => setMessage(null), 3000); };
    const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; const res = await api.deletePartner(id); if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); } setTimeout(() => setMessage(null), 3000); };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">Partners</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table"><thead><tr><th>ID</th><th>Logo</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (<tr key={item.id}><td>{item.id}</td><td><img src={item.logo_image} alt="" style={{ height: '30px' }} /></td><td>{item.status_partner}</td>
                            <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Logo URL</label><input type="text" value={formData.logo_image} onChange={(e) => setFormData({ ...formData, logo_image: e.target.value })} /></div>
                        <div className="form-group"><label>Status</label><input type="text" value={formData.status_partner} onChange={(e) => setFormData({ ...formData, status_partner: e.target.value })} /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
