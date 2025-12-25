'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Save, X, Loader2, AlertCircle, CheckCircle2, Star, Info } from 'lucide-react';
import { saveHighlightAction, deleteHighlightAction } from '../cms-actions';
import * as Icons from 'lucide-react';

interface Item {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    display_order: number;
    table: 'home_highlights' | 'company_values';
}

const RECOMMENDED_ICONS = [
    'ShieldCheck', 'TrendingUp', 'Users', 'Target', 'Eye',
    'Scale', 'Handshake', 'Heart', 'Award', 'Building', 'Zap', 'Lightbulb'
];

export default function HighlightsAdmin() {
    const [activeTab, setActiveTab] = useState<'home_highlights' | 'company_values'>('home_highlights');
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Item | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    async function fetchItems() {
        setLoading(true);
        const { data, error } = await supabase
            .from(activeTab)
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setMessage({ type: 'error', text: 'Error al cargar datos: ' + error.message });
        } else {
            setItems(data || []);
        }
        setLoading(false);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!editing) return;

        setSaving(true);
        setMessage(null);

        try {
            const result = await saveHighlightAction(editing, isNew, activeTab);

            if (!result.success) {
                throw new Error(result.error || 'Error al guardar los cambios');
            }

            setMessage({ type: 'success', text: 'Cambios guardados correctamente.' });
            setEditing(null);
            setIsNew(false);
            fetchItems();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al guardar los cambios.' });
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Está seguro de eliminar este elemento?')) return;

        try {
            const result = await deleteHighlightAction(id, activeTab);
            if (!result.success) {
                throw new Error(result.error || 'Error al eliminar');
            }
            setMessage({ type: 'success', text: 'Elemento eliminado.' });
            fetchItems();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al eliminar' });
        }
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 text-gray-900">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenido (Tarjetas)</h1>
                    <p className="text-sm text-gray-500">Gestione las propuestas de valor y valores corporativos.</p>
                </div>
                <button
                    onClick={() => {
                        setEditing({ id: '', title: '', description: '', icon_name: 'Shield', display_order: items.length + 1, table: activeTab });
                        setIsNew(true);
                        setMessage(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition transform hover:scale-105"
                >
                    <Plus className="h-4 w-4" /> Nuevo Elemento
                </button>
            </div>

            <div className="flex border-b border-gray-200 mb-8 font-bold">
                <button
                    onClick={() => setActiveTab('home_highlights')}
                    className={`px-8 py-4 border-b-2 transition-all ${activeTab === 'home_highlights' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Highlights (Inicio)
                </button>
                <button
                    onClick={() => setActiveTab('company_values')}
                    className={`px-8 py-4 border-b-2 transition-all ${activeTab === 'company_values' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Valores (Nosotros)
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <p className="font-medium text-sm">{message.text}</p>
                    <button onClick={() => setMessage(null)} className="ml-auto text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>
            )}

            {loading ? <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.length > 0 ? items.map((item) => {
                        const Icon = (Icons as any)[item.icon_name] || Icons.HelpCircle;
                        return (
                            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 bg-blue-50 rounded-xl text-primary border border-blue-100 group-hover:scale-110 transition-transform">
                                            <Icon size={28} />
                                        </div>
                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-bold text-gray-500 ring-1 ring-inset ring-gray-200">
                                            Orden: {item.display_order}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{item.description}</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end gap-3">
                                    <button onClick={() => { setEditing(item); setIsNew(false); setMessage(null); }} className="text-primary hover:text-blue-900 bg-blue-50 p-2.5 rounded-lg transition"><Pencil size={18} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2.5 rounded-lg transition"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium">No hay elementos creados en esta categoría.</p>
                            <button onClick={() => { setEditing({ id: '', title: '', description: '', icon_name: 'Shield', display_order: 1, table: activeTab }); setIsNew(true); setMessage(null); }} className="mt-2 text-primary font-bold hover:underline">Agregar el primero</button>
                        </div>
                    )}
                </div>
            )}

            {editing && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold">{isNew ? 'Nuevo Elemento' : 'Editar Elemento'}</h2>
                            <button onClick={() => setEditing(null)} disabled={saving}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Título</label>
                                    <input required value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Descripción</label>
                                    <textarea required rows={4} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">Icono <span title="Nombre de un icono de Lucide React"><Info size={14} className="text-gray-400" /></span></label>
                                        <input value={editing.icon_name} onChange={e => setEditing({ ...editing, icon_name: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />

                                        <div className="pt-2">
                                            <div className="flex flex-wrap gap-2">
                                                {RECOMMENDED_ICONS.map(icon => {
                                                    const Icon = (Icons as any)[icon] || Icons.HelpCircle;
                                                    return (
                                                        <button
                                                            key={icon}
                                                            type="button"
                                                            onClick={() => setEditing({ ...editing, icon_name: icon })}
                                                            className={`p-1.5 rounded-md border transition ${editing.icon_name === icon ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-primary'}`}
                                                            title={icon}
                                                        >
                                                            <Icon size={16} />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Orden</label>
                                        <input type="number" value={editing.display_order} onChange={e => setEditing({ ...editing, display_order: parseInt(e.target.value) })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition" disabled={saving}>Cancelar</button>
                                <button type="submit" disabled={saving} className="px-10 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition flex items-center gap-2 disabled:opacity-50">
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
