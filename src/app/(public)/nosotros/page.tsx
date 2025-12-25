import * as Icons from 'lucide-react';
import { Target, Eye } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { supabase } from '@/lib/supabase';

async function getAboutData() {
    const { data: settingsData } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('group', ['about']);

    const { data: values } = await supabase
        .from('company_values')
        .select('*')
        .order('display_order', { ascending: true });

    const settings = settingsData?.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {}) || {};

    return { settings, values: values || [] };
}

export default async function AboutPage() {
    const { settings, values } = await getAboutData();

    const title = settings.about_header_title || 'Nuestra Empresa';
    const subtitle = settings.about_header_subtitle || 'Somos una empresa joven y dinámica, con 9 años de experiencia dedicados a transformar la administración de propiedad horizontal en Colombia.';
    const missionTitle = settings.mission_title || 'Misión';
    const missionContent = settings.mission_content || 'Prestar servicios especializados en la administración integral de propiedad horizontal, garantizando el buen funcionamiento, la conservación y la valorización del patrimonio, bajo indicadores de gestión y una vocación de servicio social y ambiental.';
    const visionTitle = settings.vision_title || 'Visión (2030)';
    const visionContent = settings.vision_content || 'Ser reconocidos a nivel nacional como líderes en el manejo integral de propiedad horizontal, destacándonos por la idoneidad de nuestro talento humano, la eficiencia de nuestros procesos y nuestro firme compromiso con la sostenibilidad.';

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="relative bg-primary py-24 sm:py-32">
                <FadeIn className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>
                    <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </FadeIn>
            </div>

            {/* Mission & Vision */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    <FadeIn delay={0.2} direction="left">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Target className="w-8 h-8 text-accent" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{missionTitle}</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            {missionContent}
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="right">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Eye className="w-8 h-8 text-accent" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{visionTitle}</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            {visionContent}
                        </p>
                    </FadeIn>
                </div>
            </div>

            {/* Values */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Nuestros Valores</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {values.length > 0 ? values.map((val, idx) => {
                            const IconComponent = (Icons as any)[val.icon_name] || Icons.ShieldCheck;
                            return (
                                <FadeIn key={val.id} delay={0.1 * idx} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-6" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{val.title}</h3>
                                    <p className="text-gray-600">{val.description}</p>
                                </FadeIn>
                            );
                        }) : (
                            <p className="col-span-full text-center text-gray-400 italic">Cargando valores corporativos...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
