'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase, Star, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { checkSession, logoutAction } from './login/actions';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Don't check auth on login page itself
        if (pathname === '/admin/login') {
            setChecking(false);
            return;
        }

        const verify = async () => {
            // 1. Check Supabase session first
            const { data: { session } } = await supabase.auth.getSession();

            // 2. Check cookie session as fallback
            const hasCookieSession = await checkSession();

            if (!session && !hasCookieSession) {
                router.push('/admin/login');
            } else {
                setAuthenticated(true);
            }
            setChecking(false);
        };

        verify();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/admin/login');
            } else if (session) {
                setAuthenticated(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        await logoutAction();
    };

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (checking) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!authenticated) return null;

    return (
        <div className="flex h-full min-h-screen bg-gray-100 relative z-0">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 flex-col bg-gray-900 text-white">
                <div className="flex h-16 items-center justify-center bg-gray-800 font-bold text-xl">
                    ABC PH Admin
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin/dashboard" className={`flex items-center px-4 py-2 rounded transition gap-3 ${pathname === '/admin/dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/settings" className={`flex items-center px-4 py-2 rounded transition gap-3 ${pathname === '/admin/settings' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}>
                        <Settings size={20} /> Configuración
                    </Link>
                    <Link href="/admin/services" className={`flex items-center px-4 py-2 rounded transition gap-3 ${pathname === '/admin/services' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}>
                        <Briefcase size={20} /> Servicios
                    </Link>
                    <Link href="/admin/highlights" className={`flex items-center px-4 py-2 rounded transition gap-3 ${pathname === '/admin/highlights' ? 'bg-primary text-white' : 'hover:bg-gray-800'}`}>
                        <Star size={20} /> Propuestas Valor
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 hover:bg-red-900 rounded transition gap-3 text-red-300">
                        <LogOut size={20} /> Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white shadow flex items-center px-6 md:hidden">
                    <span className="font-bold">ABC PH Admin</span>
                    <button onClick={handleLogout} className="ml-auto text-red-600"><LogOut size={20} /></button>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
