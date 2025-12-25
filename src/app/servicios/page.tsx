import { Building2, Calculator, Gavel, Hammer, Users2, FileText, ShieldCheck } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

const services = [
    {
        title: 'Administración Delegada',
        description: 'Gestión operativa, administrativa y financiera en sitio. Supervisión de personal y atención directa a residentes.',
        icon: Building2,
    },
    {
        title: 'Contabilidad Especializada PH',
        description: 'Manejo contable bajo NIIF, presentación de estados financieros, facturación y recaudo de cartera.',
        icon: Calculator,
    },
    {
        title: 'Asesoría Jurídica',
        description: 'Acompañamiento legal en propiedad horizontal (Ley 675 de 2001), cobro jurídico y resolución de conflictos.',
        icon: Gavel,
    },
    {
        title: 'Mantenimiento Preventivo',
        description: 'Gestión y supervisión de cronogramas de mantenimiento para equipos y zonas comunes.',
        icon: Hammer,
    },
    {
        title: 'Gestión de Convivencia',
        description: 'Mediación en conflictos, promoción de manuales de convivencia y asambleas.',
        icon: Users2,
    },
    {
        title: 'Gestión Documental y SIG',
        description: 'Organización de archivos y gestión de calidad bajo normas ISO.',
        icon: FileText,
    },
    {
        title: 'Gestión de Riesgos',
        description: 'Implementación del SG-SST y planes de emergencia.',
        icon: ShieldCheck,
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-accent uppercase">Nuestros Servicios</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Soluciones Integrales para su Copropiedad
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Ofrecemos un portafolio completo diseñado para garantizar la valorización, seguridad y armonía de su conjunto o edificio.
                    </p>
                </FadeIn>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {services.map((service, idx) => (
                            <FadeIn delay={idx * 0.1} key={service.title} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <service.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                    {service.title}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{service.description}</p>
                                </dd>
                            </FadeIn>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
