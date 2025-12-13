import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface StoreItem { id: number; image_product: string; category_product: string; star_rating: number; price_product: number; cart_link: string; }
const emptyItem = { image_product: '', category_product: '', star_rating: 0, price_product: 0, cart_link: '' };

export default function StorePage() {
    const [items, setItems] = useState<StoreItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<StoreItem | null>(null);
    const [formData, setFormData] = useState(emptyItem);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => { setLoading(true); const res = await api.getStore(); if (res.success && res.data) setItems(res.data as StoreItem[]); setLoading(false); };
    const openAdd = () => { setEditing(null); setFormData(emptyItem); setShowModal(true); };
    const openEdit = (item: StoreItem) => { setEditing(item); setFormData({ image_product: item.image_product || '', category_product: item.category_product || '', star_rating: item.star_rating || 0, price_product: item.price_product || 0, cart_link: item.cart_link || '' }); setShowModal(true); };
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = editing ? await api.updateStore(editing.id, formData) : await api.createStore(formData); if (res.success) { setMessage({ type: 'success', text: 'Saved!' }); setShowModal(false); loadData(); } else setMessage({ type: 'error', text: 'Error' }); setTimeout(() => setMessage(null), 3000); };
    const handleDelete = async (id: number) => { if (!confirm('Delete?')) return; const res = await api.deleteStore(id); if (res.success) { setMessage({ type: 'success', text: 'Deleted!' }); loadData(); } setTimeout(() => setMessage(null), 3000); };

    return (
        <div>
            <div className="page-header"><h1 className="page-title">Store Products</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add</button></div>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <div className="card">
                {loading ? <div className="loading">Loading...</div> : items.length === 0 ? <div className="empty-state"><h3>No data</h3></div> : (
                    <table className="data-table"><thead><tr><th>ID</th><th>Category</th><th>Price</th><th>Rating</th><th>Actions</th></tr></thead>
                        <tbody>{items.map((item) => (<tr key={item.id}><td>{item.id}</td><td>{item.category_product}</td><td>${item.price_product}</td><td>⭐ {item.star_rating}</td>
                            <td className="actions"><button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header"><h2>{editing ? 'Edit' : 'Add'}</h2><button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button></div>
                    <form onSubmit={handleSubmit}><div className="modal-body">
                        <div className="form-group"><label>Category</label><input type="text" value={formData.category_product} onChange={(e) => setFormData({ ...formData, category_product: e.target.value })} /></div>
                        <div className="form-group"><label>Price</label><input type="number" step="0.01" value={formData.price_product} onChange={(e) => setFormData({ ...formData, price_product: parseFloat(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>Rating (0-5)</label><input type="number" step="0.01" max="5" value={formData.star_rating} onChange={(e) => setFormData({ ...formData, star_rating: parseFloat(e.target.value) || 0 })} /></div>
                        <div className="form-group"><label>Image URL</label><input type="text" value={formData.image_product} onChange={(e) => setFormData({ ...formData, image_product: e.target.value })} /></div>
                        <div className="form-group"><label>Cart Link</label><input type="text" value={formData.cart_link} onChange={(e) => setFormData({ ...formData, cart_link: e.target.value })} /></div>
                    </div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button></div></form>
                </div></div>
            )}
        </div>
    );
}
