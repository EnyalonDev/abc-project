import * as Icons from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { supabase } from '@/lib/supabase';

async function getServices() {
    const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
    return data || [];
}

export default async function ServicesPage() {
    const services = await getServices();

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
                        {services.length > 0 ? services.map((service, idx) => {
                            const IconComponent = (Icons as any)[service.icon_name] || Icons.Building2;
                            return (
                                <FadeIn delay={idx * 0.1} key={service.id} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                        <IconComponent className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                        {service.title}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{service.description}</p>
                                    </dd>
                                </FadeIn>
                            );
                        }) : (
                            <p className="col-span-full text-center text-gray-400 italic">Cargando catálogo de servicios...</p>
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
}
