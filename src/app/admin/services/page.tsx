'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Save, X, Loader2, AlertCircle, CheckCircle2, Briefcase, Info, Check, Star } from 'lucide-react';
import { saveServiceAction, deleteServiceAction } from '../cms-actions';
import * as Icons from 'lucide-react';

interface Service {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    display_order: number;
    is_active: boolean;
    is_featured: boolean;
}

const RECOMMENDED_ICONS = [
    'Building2', 'ShieldCheck', 'TrendingUp', 'Users', 'CheckCircle2',
    'Scale', 'Wrench', 'Lightbulb', 'FileText', 'Handshake', 'SafetyCone', 'Map'
];

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Service | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setMessage({ type: 'error', text: 'Error al cargar servicios: ' + error.message });
        } else {
            setServices(data || []);
        }
        setLoading(false);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!editing) return;

        setSaving(true);
        setMessage(null);

        try {
            const result = await saveServiceAction(editing, isNew);

            if (!result.success) {
                throw new Error(result.error || 'Error al guardar el servicio');
            }

            setMessage({ type: 'success', text: 'Servicio guardado correctamente.' });
            setEditing(null);
            setIsNew(false);
            fetchServices();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al guardar el servicio.' });
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Está seguro de eliminar este servicio?')) return;

        try {
            const result = await deleteServiceAction(id);
            if (!result.success) {
                throw new Error(result.error || 'Error al eliminar el servicio');
            }
            setMessage({ type: 'success', text: 'Servicio eliminado.' });
            fetchServices();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al eliminar' });
        }
    }

    const openEdit = (service: Service) => {
        setEditing(service);
        setIsNew(false);
        setMessage(null);
    };

    const openNew = () => {
        setEditing({
            id: '',
            title: '',
            description: '',
            icon_name: 'Building2',
            display_order: services.length + 1,
            is_active: true,
            is_featured: false
        });
        setIsNew(true);
        setMessage(null);
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Servicios</h1>
                    <p className="text-sm text-gray-500">Administre el catálogo de servicios que ven sus clientes.</p>
                </div>
                <button
                    onClick={openNew}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition transform hover:scale-105"
                >
                    <Plus className="h-4 w-4" /> Nuevo Servicio
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

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orden</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Destacado</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {services.length > 0 ? services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{service.display_order}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                                            {(() => {
                                                const Icon = (Icons as any)[service.icon_name] || Icons.HelpCircle;
                                                return <Icon className="h-5 w-5 text-primary" />;
                                            })()}
                                        </div>
                                        <div className="max-w-xs">
                                            <div className="font-bold text-gray-900">{service.title}</div>
                                            <div className="text-xs text-gray-500 truncate" title={service.description}>{service.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {service.is_featured ? <Star className="h-5 w-5 text-yellow-500 mx-auto fill-yellow-500" /> : <span className="text-gray-300">-</span>}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {service.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                                    <button onClick={() => openEdit(service)} className="text-primary hover:text-blue-900 bg-blue-50 p-2 rounded-md transition"><Pencil size={18} /></button>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md transition"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Briefcase className="h-12 w-12 text-gray-200" />
                                        <p className="text-gray-500 font-medium">No hay servicios registrados aún.</p>
                                        <button onClick={openNew} className="text-primary font-bold hover:underline">Agregar el primero</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {editing && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'Nuevo Servicio' : 'Editar Servicio'}</h2>
                            <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-full transition" disabled={saving}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-full">
                                    <label className="text-sm font-bold text-gray-700">Título del Servicio</label>
                                    <input required value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent border transition" placeholder="Ej: Administración Integral" />
                                </div>
                                <div className="space-y-2 col-span-full">
                                    <label className="text-sm font-bold text-gray-700">Descripción Detallada</label>
                                    <textarea required rows={4} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent border transition" placeholder="Describa el alcance del servicio..." />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        Icono <span title="Nombre de un icono de Lucide React"><Info size={14} className="text-gray-400" /></span>
                                    </label>
                                    <input value={editing.icon_name} onChange={e => setEditing({ ...editing, icon_name: e.target.value })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />

                                    <div className="pt-2">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Sugeridos:</p>
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
                                    <label className="text-sm font-bold text-gray-700">Orden de Visualización</label>
                                    <input type="number" value={editing.display_order} onChange={e => setEditing({ ...editing, display_order: parseInt(e.target.value) })} className="w-full rounded-xl border-gray-200 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 py-4 bg-gray-50 p-6 rounded-xl">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" checked={editing.is_active} onChange={e => setEditing({ ...editing, is_active: e.target.checked })} className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:bg-green-500 checked:border-green-500" />
                                        <Check className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 text-white peer-checked:block hidden" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Activo (Visible en la web)</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" checked={editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:bg-yellow-500 checked:border-yellow-500" />
                                        <Star className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 text-white peer-checked:block hidden fill-white" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Destacar en Inicio</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition" disabled={saving}>Cancelar</button>
                                <button type="submit" disabled={saving} className="px-10 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition flex items-center gap-2 disabled:opacity-50">
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    {isNew ? 'Crear Servicio' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
