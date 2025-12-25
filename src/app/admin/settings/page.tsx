'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { saveSiteSettings } from '../cms-actions';

interface Setting {
    id: string;
    key: string;
    value: string;
    label: string;
    group: string;
}

export default function SettingsAdmin() {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .order('group', { ascending: true });

        if (error) {
            setMessage({ type: 'error', text: 'Error al cargar configuraciones: ' + error.message });
        } else {
            setSettings(data || []);
        }
        setLoading(false);
    }

    const handleChange = (key: string, value: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    };

    async function handleSave() {
        setSaving(true);
        setMessage(null);

        try {
            const result = await saveSiteSettings(settings.map(s => ({ key: s.key, value: s.value })));

            if (!result.success) {
                throw new Error(result.error || 'Error al guardar cambios');
            }

            setMessage({ type: 'success', text: 'Configuraciones guardadas correctamente' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            fetchSettings();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al guardar cambios' });
            console.error('Save error details:', error);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const groups = Array.from(new Set(settings.map(s => s.group)));

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configuración General del Sitio</h1>
                    <p className="text-sm text-gray-500">Administre los textos principales, datos de contacto y redes sociales.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="hidden sm:flex inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 disabled:opacity-50 transition transform hover:scale-105"
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Guardar Cambios
                </button>
            </div>

            {message && (
                <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <p className="font-medium text-sm">{message.text}</p>
                    <button onClick={() => setMessage(null)} className="ml-auto text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>
            )}

            <div className="space-y-12">
                {groups.map(group => (
                    <section key={group} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                                Sección: {group === 'home' ? 'Inicio / Hero' : group === 'about' ? 'Nosotros' : group === 'contact' ? 'Contacto' : group === 'footer' ? 'Pie de Página' : group}
                            </h2>
                        </div>
                        <div className="p-8 space-y-8">
                            {settings.filter(s => s.group === group).map(setting => (
                                <div key={setting.key} className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        {setting.label}
                                    </label>
                                    {setting.value && setting.value.length > 80 ? (
                                        <textarea
                                            rows={4}
                                            value={setting.value}
                                            onChange={(e) => handleChange(setting.key, e.target.value)}
                                            className="block w-full rounded-xl border-gray-200 p-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={setting.value}
                                            onChange={(e) => handleChange(setting.key, e.target.value)}
                                            className="block w-full rounded-xl border-gray-200 p-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary border transition"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Mobile / Sticky Floating Save Button */}
            <div className="fixed bottom-8 right-8 z-30 sm:hidden">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-2xl hover:bg-blue-800 disabled:opacity-50 transition transform active:scale-95"
                >
                    {saving ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
                </button>
            </div>

            <div className="hidden sm:flex sticky bottom-8 justify-center z-30 mt-12">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-12 py-4 text-lg font-bold text-white shadow-2xl hover:bg-blue-800 disabled:opacity-50 transition transform hover:-translate-y-1"
                >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    Guardar Todos los Cambios
                </button>
            </div>
        </div>
    );
}
