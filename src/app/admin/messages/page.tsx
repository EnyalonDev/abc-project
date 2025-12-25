'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Trash2, CheckCircle, Clock, Search, X, Loader2, AlertCircle, CheckCircle2, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { deleteContactMessageAction, toggleMessageReadAction, getContactMessagesAction } from '../cms-actions';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    is_read: boolean;
}

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [unreadCount, setUnreadCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchMessages(currentPage);
    }, [currentPage]);

    async function fetchMessages(page: number) {
        setLoading(true);
        try {
            const result = await getContactMessagesAction(page, 10);
            if (result.success) {
                setMessages(result.data || []);
                setTotalPages(result.totalPages || 1);
                setUnreadCount(result.unreadCount || 0);
                setTotalCount(result.count || 0);
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error al cargar mensajes: ' + error.message });
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Está seguro de eliminar este mensaje?')) return;

        try {
            const result = await deleteContactMessageAction(id);
            if (!result.success) throw new Error(result.error);

            setMessage({ type: 'success', text: 'Mensaje eliminado.' });
            if (selectedMessage?.id === id) setSelectedMessage(null);
            fetchMessages(currentPage);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al eliminar' });
        }
    }

    async function handleToggleRead(msg: Message) {
        try {
            const result = await toggleMessageReadAction(msg.id, msg.is_read);
            if (!result.success) throw new Error(result.error);

            if (selectedMessage?.id === msg.id) {
                setSelectedMessage({ ...selectedMessage, is_read: !msg.is_read });
            }
            fetchMessages(currentPage);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al actualizar estado' });
        }
    }

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && messages.length === 0) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">Mensajes de Contacto</h1>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                {unreadCount} NUEVOS
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">Total: {totalCount} mensajes recibidos.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Buscar mensajes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 text-sm focus:ring-primary focus:border-primary border transition"
                    />
                </div>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <p className="font-medium text-sm">{message.text}</p>
                    <button onClick={() => setMessage(null)} className="ml-auto text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Container */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                                <Loader2 className="animate-spin text-primary" />
                            </div>
                        )}

                        {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-4 rounded-2xl border transition cursor-pointer group hover:shadow-md ${selectedMessage?.id === msg.id
                                    ? 'bg-blue-50 border-primary shadow-sm'
                                    : msg.is_read ? 'bg-white border-gray-100' : 'bg-white border-blue-200 border-l-4 border-l-primary'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${msg.is_read ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-primary'
                                        }`}>
                                        {msg.is_read ? 'Leído' : 'Nuevo'}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 truncate">{msg.name}</h3>
                                <p className="text-xs text-gray-500 truncate mb-2">{msg.email}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
                            </div>
                        )) : (
                            <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                                <Mail className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No se encontraron mensajes.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm mt-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1 || loading}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-xs font-bold text-gray-500">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || loading}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Detail */}
                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                                <div className="flex justify-between items-start gap-4 flex-wrap">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                                            <a href={`mailto:${selectedMessage.email}`} className="text-sm text-primary hover:underline">{selectedMessage.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleRead(selectedMessage)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${selectedMessage.is_read
                                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            {selectedMessage.is_read ? <Clock size={14} /> : <CheckCircle size={14} />}
                                            {selectedMessage.is_read ? 'Marcar No Leído' : 'Marcar Leído'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-6 mt-6 text-xs text-gray-400 font-medium">
                                    <div className="flex items-center gap-1.5"><Calendar size={14} /> Recibido el {new Date(selectedMessage.created_at).toLocaleString()}</div>
                                    <div className="flex items-center gap-1.5"><Mail size={14} /> {selectedMessage.id.split('-')[0]}</div>
                                </div>
                            </div>
                            <div className="p-8 whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                                {selectedMessage.message}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center h-full flex flex-col items-center justify-center">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <Mail className="h-12 w-12 text-gray-200" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-400 mb-2">Seleccione un mensaje</h3>
                            <p className="text-sm text-gray-400 max-w-xs mx-auto">Haga clic en un mensaje de la lista para ver su contenido completo y gestionar el contacto.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
