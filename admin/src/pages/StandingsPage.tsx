import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Standing {
    id: number;
    position_race: number;
    name_driver: string;
    team_race: string;
    win_score: number;
    point_score: number;
}

const emptyItem = { position_race: 0, name_driver: '', team_race: '', win_score: 0, point_score: 0 };

export default function StandingsPage() {
    const [items, setItems] = useState<Standing[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Standing | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await api.getStandings();
        if (res.success && res.data) setItems(res.data as Standing[]);
        setLoading(false);
    };

    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: Standing) => {
        setEditing(item);
        setFormData({
            position_race: item.position_race || 0,
            name_driver: item.name_driver || '',
            team_race: item.team_race || '',
            win_score: item.win_score || 0,
            point_score: item.point_score || 0,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = editing ? await api.updateStanding(editing.id, formData) : await api.createStanding(formData);
        if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); }
        else setMessage({ type: 'error', text: res.message || 'Error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete?')) return;
        const res = await api.deleteStanding(id);
        if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Driver Standings</h1>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Standing</button>
            </div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? (
                    <div className="empty-state"><h3>No standings found</h3></div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>Pos</th><th>Driver</th><th>Team</th><th>Wins</th><th>Points</th><th>Actions</th></tr></thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.position_race}</td>
                                    <td>{item.name_driver}</td>
                                    <td>{item.team_race}</td>
                                    <td>{item.win_score}</td>
                                    <td>{item.point_score}</td>
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
                        <div className="modal-header"><h2>{editing ? 'Edit Standing' : 'Add Standing'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Position</label>
                                    <input type="number" value={formData.position_race} onChange={(e) => setFormData({ ...formData, position_race: parseInt(e.target.value) || 0 })} /></div>
                                <div className="form-group"><label>Driver Name</label>
                                    <input type="text" value={formData.name_driver} onChange={(e) => setFormData({ ...formData, name_driver: e.target.value })} required /></div>
                                <div className="form-group"><label>Team</label>
                                    <input type="text" value={formData.team_race} onChange={(e) => setFormData({ ...formData, team_race: e.target.value })} /></div>
                                <div className="form-group"><label>Wins</label>
                                    <input type="number" value={formData.win_score} onChange={(e) => setFormData({ ...formData, win_score: parseInt(e.target.value) || 0 })} /></div>
                                <div className="form-group"><label>Points</label>
                                    <input type="number" value={formData.point_score} onChange={(e) => setFormData({ ...formData, point_score: parseInt(e.target.value) || 0 })} /></div>
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
