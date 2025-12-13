import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface HeritageItem {
    id: number;
    constructors_total: number;
    drivers_champ_total: number;
    grand_prix_victories_total: number;
    year_racing_total: number;
    link_discover: string;
}

const emptyItem = { constructors_total: 0, drivers_champ_total: 0, grand_prix_victories_total: 0, year_racing_total: 0, link_discover: '' };

export default function HeritagePage() {
    const [items, setItems] = useState<HeritageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HeritageItem | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
        setLoading(true);
        const res = await api.getHeritage();
        if (res.success && res.data) setItems(res.data as HeritageItem[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: HeritageItem) => {
        setEditing(item);
        setFormData({ constructors_total: item.constructors_total || 0, drivers_champ_total: item.drivers_champ_total || 0, grand_prix_victories_total: item.grand_prix_victories_total || 0, year_racing_total: item.year_racing_total || 0, link_discover: item.link_discover || '' });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateHeritage(editing.id, formData) : await api.createHeritage(formData);
        if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); }
        else setMessage({ type: 'error', text: 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete?')) return;
        const res = await api.deleteHeritage(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">Heritage</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Constructors</th><th>Drivers Titles</th><th>GP Wins</th><th>Years Racing</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (
                            <tr key={item.id}><td>{item.id}</td><td>{item.constructors_total}</td><td>{item.drivers_champ_total}</td><td>{item.grand_prix_victories_total}</td><td>{item.year_racing_total}</td>
                                <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>
                        ))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Constructors</label><input type="number" value={formData.constructors_total} onChange={(e) => setFormData({ ...formData, constructors_total: parseInt(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>Drivers Championships</label><input type="number" value={formData.drivers_champ_total} onChange={(e) => setFormData({ ...formData, drivers_champ_total: parseInt(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>GP Victories</label><input type="number" value={formData.grand_prix_victories_total} onChange={(e) => setFormData({ ...formData, grand_prix_victories_total: parseInt(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>Years Racing</label><input type="number" value={formData.year_racing_total} onChange={(e) => setFormData({ ...formData, year_racing_total: parseInt(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>Discover Link</label><input type="text" value={formData.link_discover} onChange={(e) => setFormData({ ...formData, link_discover: e.target.value })} /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
