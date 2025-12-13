import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Result {
    id: number;
    image_card: string;
    round_number: number;
    title_circuit: string;
    race_time: string;
    champ_point: number;
    status: string;
    driver: string;
}

const emptyItem = { image_card: '', round_number: 0, title_circuit: '', race_time: '', champ_point: 0, status: '', driver: '' };

export default function ResultsPage() {
    const [items, setItems] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Result | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await api.getResults();
        if (res.success && res.data) setItems(res.data as Result[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: Result) => {
        setEditing(item);
        setFormData({
            image_card: item.image_card || '',
            round_number: item.round_number || 0,
            title_circuit: item.title_circuit || '',
            race_time: item.race_time || '',
            champ_point: item.champ_point || 0,
            status: item.status || '',
            driver: item.driver || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateResult(editing.id, formData) : await api.createResult(formData);
        if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); }
        else setMessage({ type: 'error', text: res.message || 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete?')) return;
        const res = await api.deleteResult(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Race Results</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Result</button>
            </div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? (
                    <div className="empty-state"><h3>No results found</h3></div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>Round</th><th>Circuit</th><th>Driver</th><th>Points</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.round_number}</td>
                                    <td>{item.title_circuit}</td>
                                    <td>{item.driver}</td>
                                    <td>{item.champ_point}</td>
                                    <td>{item.status}</td>
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
                        <div className="modal-header"><h2>{editing ? 'Edit Result' : 'Add Result'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Round Number</label>
                                    <input type="number" value={formData.round_number} onChange={(e) => setFormData({ ...formData, round_number: parseInt(e.target.value) || 0 })} /></div>
                                <div className="form-group"><label>Circuit</label>
                                    <input type="text" value={formData.title_circuit} onChange={(e) => setFormData({ ...formData, title_circuit: e.target.value })} required /></div>
                                <div className="form-group"><label>Driver</label>
                                    <input type="text" value={formData.driver} onChange={(e) => setFormData({ ...formData, driver: e.target.value })} /></div>
                                <div className="form-group"><label>Championship Points</label>
                                    <input type="number" value={formData.champ_point} onChange={(e) => setFormData({ ...formData, champ_point: parseInt(e.target.value) || 0 })} /></div>
                                <div className="form-group"><label>Race Time</label>
                                    <input type="text" value={formData.race_time} onChange={(e) => setFormData({ ...formData, race_time: e.target.value })} placeholder="HH:MM:SS" /></div>
                                <div className="form-group"><label>Status</label>
                                    <input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} /></div>
                                <div className="form-group"><label>Image URL</label>
                                    <input type="text" value={formData.image_card} onChange={(e) => setFormData({ ...formData, image_card: e.target.value })} /></div>
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
