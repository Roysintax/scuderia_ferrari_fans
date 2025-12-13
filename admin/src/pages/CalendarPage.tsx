import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface CalendarItem {
    id: number;
    number_list_race: number;
    title_race: string;
    location_race: string;
    date_race: string;
    name_circuit: string;
}

const emptyItem = { number_list_race: 0, title_race: '', location_race: '', date_race: '', name_circuit: '' };

export default function CalendarPage() {
    const [items, setItems] = useState<CalendarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<CalendarItem | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await api.getCalendar();
        if (res.success && res.data) setItems(res.data as CalendarItem[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: CalendarItem) => {
        setEditing(item);
        setFormData({
            number_list_race: item.number_list_race || 0,
            title_race: item.title_race || '',
            location_race: item.location_race || '',
            date_race: item.date_race?.split('T')[0] || '',
            name_circuit: item.name_circuit || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateCalendar(editing.id, formData) : await api.createCalendar(formData);
        if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); }
        else setMessage({ type: 'error', text: res.message || 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete?')) return;
        const res = await api.deleteCalendar(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        else setMessage({ type: 'error', text: 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Race Calendar</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Race</button>
            </div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? (
                    <div className="empty-state"><h3>No races found</h3></div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Title</th><th>Circuit</th><th>Location</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.number_list_race}</td>
                                    <td>{item.title_race}</td>
                                    <td>{item.name_circuit}</td>
                                    <td>{item.location_race}</td>
                                    <td>{item.date_race?.split('T')[0]}</td>
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
                        <div className="modal-header"><h2>{editing ? 'Edit Race' : 'Add Race'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Race Number</label>
                                    <input type="number" value={formData.number_list_race} onChange={(e) => setFormData({ ...formData, number_list_race: parseInt(e.target.value) || 0 })} /></div>
                                <div className="form-group"><label>Title</label>
                                    <input type="text" value={formData.title_race} onChange={(e) => setFormData({ ...formData, title_race: e.target.value })} required /></div>
                                <div className="form-group"><label>Circuit Name</label>
                                    <input type="text" value={formData.name_circuit} onChange={(e) => setFormData({ ...formData, name_circuit: e.target.value })} /></div>
                                <div className="form-group"><label>Location</label>
                                    <input type="text" value={formData.location_race} onChange={(e) => setFormData({ ...formData, location_race: e.target.value })} /></div>
                                <div className="form-group"><label>Date</label>
                                    <input type="date" value={formData.date_race} onChange={(e) => setFormData({ ...formData, date_race: e.target.value })} /></div>
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
