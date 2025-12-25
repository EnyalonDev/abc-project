import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { supabase } from '@/lib/supabase';

async function getHomeData() {
    // Fetch settings
    const { data: settingsData } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('group', ['home']);

    // Fetch highlights
    const { data: highlights } = await supabase
        .from('home_highlights')
        .select('*')
        .order('display_order', { ascending: true });

    // Fetch featured services
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    const settings = settingsData?.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {}) || {};

    return { settings, highlights: highlights || [], services: services || [] };
}

export default async function Home() {
    const { settings, highlights, services } = await getHomeData();

    const heroTitle = settings.hero_title || 'Su Patrimonio en las Mejores Manos';
    const heroSubtitle = settings.hero_subtitle || 'Gestión profesional de propiedad horizontal en Colombia. Garantizamos transparencia, seguridad y valorización para su conjunto residencial o edificio corporativo.';

    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 opacity-90 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}></div>

                <FadeIn className="relative z-20 max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center" direction="up">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 drop-shadow-md">
                        {heroTitle}
                    </h1>
                    <p className="mt-4 text-xl text-blue-100 max-w-2xl leading-relaxed">
                        {heroSubtitle}
                    </p>
                    <div className="mt-10 flex gap-4">
                        <Link href="/contacto" className="rounded-md bg-accent px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-yellow-600 transition-all transform hover:scale-105">
                            Solicitar Propuesta
                        </Link>
                        <Link href="/servicios" className="rounded-md bg-white/10 px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-white/50 backdrop-blur-sm transition-all">
                            Nuestros Servicios
                        </Link>
                    </div>
                </FadeIn>
            </section>

            {/* Highlights */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <FadeIn className="text-center max-w-3xl mx-auto mb-16" delay={0.2}>
                        <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-wider">Por qué elegirnos</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Más que administradores, somos sus aliados estratégicos
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {highlights.length > 0 ? highlights.map((highlight, idx) => {
                            const IconComponent = (Icons as any)[highlight.icon_name] || ShieldCheck;
                            return (
                                <FadeIn key={highlight.id} delay={0.1 * idx} className="flex flex-col items-start p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                                    <div className="rounded-lg bg-primary/10 p-3 mb-6">
                                        <IconComponent className="h-8 w-8 text-primary" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold leading-7 text-gray-900 mb-3">{highlight.title}</h3>
                                    <p className="text-base leading-7 text-gray-600">{highlight.description}</p>
                                </FadeIn>
                            );
                        }) : (
                            /* Fallback if no highlights in DB */
                            <p className="col-span-full text-center text-gray-400">Cargando propuestas de valor...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <FadeIn className="md:flex md:items-center md:justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Servicios</h2>
                            <p className="mt-2 text-lg text-gray-600">Soluciones integrales para cada necesidad.</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link href="/servicios" className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700">
                                Ver todos los servicios <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {services.length > 0 ? services.map((service, idx) => (
                            <FadeIn key={service.id} delay={0.05 * idx} direction="up" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                                <span className="font-medium text-gray-900">{service.title}</span>
                            </FadeIn>
                        )) : (
                            <p className="col-span-full text-center text-gray-400">Consulte nuestro portafolio completo en la sección servicios.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16 sm:py-24">
                <FadeIn className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">¿Listo para mejorar la administración de su copropiedad?</h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/contacto"
                            className="rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-primary shadow-sm hover:bg-gray-100 transition-colors"
                        >
                            Contáctenos
                        </Link>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
