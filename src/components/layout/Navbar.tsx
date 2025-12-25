'use client';


import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios', href: '/servicios' },
    // { name: 'Noticias', href: '/noticias' }, // Phase 2
    { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
            {/* Top Bar */}
            <div className="bg-primary text-primary-foreground py-2 px-6 text-sm hidden sm:flex justify-between items-center">
                <p className="font-medium">Su Patrimonio en las Mejores Manos</p>
                <div className="flex gap-4">
                    <a href="tel:+573102971834" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <Phone size={14} /> 310 297 1834
                    </a>
                    <a href="mailto:gerencia@abcpropiedadhorizontal.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <Mail size={14} /> gerencia@abcpropiedadhorizontal.com
                    </a>
                </div>
            </div>

            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Grupo ABC PH</span>
                        <Image
                            src="/logo.png"
                            alt="Grupo ABC PH Logo"
                            width={225}
                            height={75}
                            className="h-[75px] w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors uppercase tracking-wide">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/admin/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                        Admin <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Grupo ABC PH</span>
                                <Image
                                    src="/logo.png"
                                    alt="Grupo ABC PH Logo"
                                    width={188}
                                    height={65}
                                    className="h-[68px] w-auto object-contain"
                                />
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-primary cursor-pointer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Cerrar menú</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-primary uppercase"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a href="tel:+573102971834" className="block text-sm font-medium text-gray-600 mb-2">
                                        <Phone size={16} className="inline mr-2" /> 310 297 1834
                                    </a>
                                    <Link
                                        href="/admin/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Admin Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
