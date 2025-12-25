import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 flex-col bg-gray-900 text-white">
                <div className="flex h-16 items-center justify-center bg-gray-800 font-bold text-xl">
                    ABC PH Admin
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded transition gap-3">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/services" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded transition gap-3">
                        <Briefcase size={20} /> Servicios
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded transition gap-3">
                        <FileText size={20} /> Noticias
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-800 rounded transition gap-3">
                        <Settings size={20} /> Configuración
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <Link href="/admin/login" className="flex items-center px-4 py-2 hover:bg-red-900 rounded transition gap-3 text-red-300">
                        <LogOut size={20} /> Cerrar Sesión
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white shadow flex items-center px-6 md:hidden">
                    <span className="font-bold">ABC PH Admin</span>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
