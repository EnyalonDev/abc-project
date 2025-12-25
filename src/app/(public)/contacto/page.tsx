import { Mail, MapPin, Phone } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { supabase } from '@/lib/supabase';
import ContactForm from './ContactForm';

async function getContactSettings() {
    const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('group', ['contact']);

    return data?.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {}) || {};
}

export default async function ContactPage() {
    const settings = await getContactSettings();

    const address = settings.contact_address || 'Av. Calle 34 # 24 – 05 Of 206, Bogotá, Colombia';
    const phone1 = settings.contact_phone_1 || '310 297 1834';
    const phone2 = settings.contact_phone_2 || '';
    const email = settings.contact_email || 'gerencia@abcpropiedadhorizontal.com';
    const hours = settings.attention_hours || 'Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM';

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <FadeIn className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contáctenos</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Estamos listos para atender sus requerimientos. Envíenos un mensaje o visítenos.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info */}
                    <FadeIn direction="right" delay={0.2}>
                        <h3 className="text-xl font-bold text-gray-900 mb-8">Información de Contacto</h3>
                        <dl className="space-y-6 text-base text-gray-600">
                            <div className="flex gap-4">
                                <dt className="flex-none"><MapPin className="w-6 h-6 text-primary" /></dt>
                                <dd>{address}</dd>
                            </div>
                            <div className="flex gap-4">
                                <dt className="flex-none"><Phone className="w-6 h-6 text-primary" /></dt>
                                <dd>
                                    <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:text-primary">{phone1}</a> <br />
                                    {phone2 && <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-primary">{phone2}</a>}
                                </dd>
                            </div>
                            <div className="flex gap-4">
                                <dt className="flex-none"><Mail className="w-6 h-6 text-primary" /></dt>
                                <dd>
                                    <a href={`mailto:${email}`} className="hover:text-primary">{email}</a>
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-12 bg-gray-100 p-6 rounded-lg text-sm text-gray-500">
                            <p className="font-semibold text-gray-900 mb-2">Horario de Atención</p>
                            <p>{hours}</p>
                        </div>
                    </FadeIn>

                    {/* Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <ContactForm />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
