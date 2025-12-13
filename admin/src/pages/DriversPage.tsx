import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Driver {
    id: number;
    image_driver: string;
    locate_driver: string;
    title_total: number;
    podium_total: number;
    race_total: number;
    link_instagram: string;
    link_twitter: string;
    link_facebook: string;
}

const emptyDriver: Omit<Driver, 'id'> = {
    image_driver: '',
    locate_driver: '',
    title_total: 0,
    podium_total: 0,
    race_total: 0,
    link_instagram: '',
    link_twitter: '',
    link_facebook: '',
};

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
    const [formData, setFormData] = useState(emptyDriver);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        setLoading(true);
        const res = await api.getDrivers();
        if (res.success && res.data) {
            setDrivers(res.data as Driver[]);
        }
        setLoading(false);
    };

    const openAddModal = () => {
        setEditingDriver(null);
        setFormData(emptyDriver);
        setShowModal(true);
    };

    const openEditModal = (driver: Driver) => {
        setEditingDriver(driver);
        setFormData({
            image_driver: driver.image_driver || '',
            locate_driver: driver.locate_driver || '',
            title_total: driver.title_total || 0,
            podium_total: driver.podium_total || 0,
            race_total: driver.race_total || 0,
            link_instagram: driver.link_instagram || '',
            link_twitter: driver.link_twitter || '',
            link_facebook: driver.link_facebook || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let res;
        if (editingDriver) {
            res = await api.updateDriver(editingDriver.id, formData);
        } else {
            res = await api.createDriver(formData);
        }

        if (res.success) {
            setMessage({ type: 'success', text: editingDriver ? 'Driver updated!' : 'Driver added!' });
            setShowModal(false);
            loadDrivers();
        } else {
            setMessage({ type: 'error', text: res.message || 'Failed to save' });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this driver?')) return;

        const res = await api.deleteDriver(id);
        if (res.success) {
            setMessage({ type: 'success', text: 'Driver deleted!' });
            loadDrivers();
        } else {
            setMessage({ type: 'error', text: res.message || 'Failed to delete' });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Drivers</h1>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={18} /> Add Driver
                </button>
            </div>

            {message && (
                <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}

            <div className="card">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : drivers.length === 0 ? (
                    <div className="empty-state">
                        <h3>No drivers found</h3>
                        <p>Add your first driver to get started</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Location</th>
                                <th>Titles</th>
                                <th>Podiums</th>
                                <th>Races</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((driver) => (
                                <tr key={driver.id}>
                                    <td>{driver.id}</td>
                                    <td>{driver.locate_driver}</td>
                                    <td>{driver.title_total}</td>
                                    <td>{driver.podium_total}</td>
                                    <td>{driver.race_total}</td>
                                    <td className="actions">
                                        <button className="btn btn-secondary btn-sm" onClick={() => openEditModal(driver)}>
                                            <Pencil size={14} />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(driver.id)}>
                                            <Trash2 size={14} />
                                        </button>
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
                            <h2>{editingDriver ? 'Edit Driver' : 'Add Driver'}</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image_driver}
                                        onChange={(e) => setFormData({ ...formData, image_driver: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={formData.locate_driver}
                                        onChange={(e) => setFormData({ ...formData, locate_driver: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Total Titles</label>
                                    <input
                                        type="number"
                                        value={formData.title_total}
                                        onChange={(e) => setFormData({ ...formData, title_total: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Total Podiums</label>
                                    <input
                                        type="number"
                                        value={formData.podium_total}
                                        onChange={(e) => setFormData({ ...formData, podium_total: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Total Races</label>
                                    <input
                                        type="number"
                                        value={formData.race_total}
                                        onChange={(e) => setFormData({ ...formData, race_total: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Instagram</label>
                                    <input
                                        type="text"
                                        value={formData.link_instagram}
                                        onChange={(e) => setFormData({ ...formData, link_instagram: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Twitter</label>
                                    <input
                                        type="text"
                                        value={formData.link_twitter}
                                        onChange={(e) => setFormData({ ...formData, link_twitter: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Facebook</label>
                                    <input
                                        type="text"
                                        value={formData.link_facebook}
                                        onChange={(e) => setFormData({ ...formData, link_facebook: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingDriver ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
