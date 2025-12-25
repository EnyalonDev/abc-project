import { User, HandHeart, Target, Eye } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

const values = [
    {
        title: 'Transparencia',
        description: 'Gestión clara y verificable de todos los recursos y decisiones.',
        icon: Eye,
    },
    {
        title: 'Responsabilidad',
        description: 'Compromiso total con el cuidado del patrimonio y el bienestar común.',
        icon: HandHeart,
    },
    {
        title: 'Honestidad',
        description: 'Actuamos con rectitud e integridad en cada proceso.',
        icon: User,
    },
];

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="relative bg-primary py-24 sm:py-32">
                <FadeIn className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Nuestra Empresa</h1>
                    <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
                        Somos una empresa joven y dinámica, con 9 años de experiencia dedicados a transformar la administración de propiedad horizontal en Colombia.
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
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Misión</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Prestar servicios especializados en la administración integral de propiedad horizontal, garantizando el buen funcionamiento, la conservación y la valorización del patrimonio, bajo indicadores de gestión y una vocación de servicio social y ambiental.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="right">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Eye className="w-8 h-8 text-accent" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Visión (2030)</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Ser reconocidos a nivel nacional como líderes en el manejo integral de propiedad horizontal, destacándonos por la idoneidad de nuestro talento humano, la eficiencia de nuestros procesos y nuestro firme compromiso con la sostenibilidad.
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
                        {values.map((val, idx) => (
                            <FadeIn key={val.title} delay={0.1 * idx} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                <val.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{val.title}</h3>
                                <p className="text-gray-600">{val.description}</p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
