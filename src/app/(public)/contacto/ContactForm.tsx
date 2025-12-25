'use client';

import { useState } from 'react';
import { submitContactMessage } from './actions';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        setErrorMessage('');

        try {
            const result = await submitContactMessage(formData);
            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Error al enviar mensaje');
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage('Error de conexión');
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-8 rounded-2xl shadow-sm text-center animate-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-700 mb-6">Hemos recibido su requerimiento. Un miembro de nuestro equipo se pondrá en contacto con usted lo antes posible.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-green-800 font-semibold hover:underline"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Nombre Completo</label>
                    <div className="mt-2.5">
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent border transition"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Correo Electrónico</label>
                    <div className="mt-2.5">
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent border transition"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Mensaje</label>
                    <div className="mt-2.5">
                        <textarea
                            required
                            name="message"
                            id="message"
                            rows={4}
                            className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent border transition"
                            placeholder="¿En qué podemos ayudarle?"
                        ></textarea>
                    </div>
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                        <AlertCircle className="w-5 h-5 flex-none" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3.5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition transform hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Enviar Mensaje
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
