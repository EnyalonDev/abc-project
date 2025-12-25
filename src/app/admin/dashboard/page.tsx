import Link from 'next/link';
import { Settings, Briefcase, Star, MessageSquare, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Panel de Control</h1>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                {[
                    { name: 'Configuración General del Sitio', href: '/admin/settings', icon: Settings, color: 'bg-gray-700', count: 'Ajustes globales' },
                    { name: 'Tarjetas', href: '/admin/highlights', icon: Star, color: 'bg-yellow-500', count: 'Gestión de tarjetas' },
                    { name: 'Servicios', href: '/admin/services', icon: Briefcase, color: 'bg-blue-500', count: 'Editar catálogo' },
                    { name: 'Mensajes', href: '#', icon: MessageSquare, color: 'bg-green-500', count: 'Próximamente' },
                ].map((item) => (
                    <Link key={item.name} href={item.href} className="group bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-all p-6">
                        <div className={`inline-flex p-3 rounded-lg ${item.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.count}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-8 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity className="text-primary" size={20} /> Estado del Sistema
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-600">Base de Datos (Supabase)</span>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Conectado</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-600">Autenticación</span>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Activa</span>
                        </div>
                    </div>
                </div>

                <div className="bg-primary text-white shadow-sm rounded-xl p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-2">Bienvenido, Gerencia</h2>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                        Desde este panel puede mantener actualizado todo el contenido informativo de su sitio web de forma sencilla y rápida.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/" target="_blank" className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md border border-white/20 transition">
                            Ver Sitio Público
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
