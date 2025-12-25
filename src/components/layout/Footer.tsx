import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react';
import { supabase } from '@/lib/supabase';

async function getSettings() {
    const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('group', ['footer', 'contact']);

    // Convert array to key-value object
    return data?.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {}) || {};
}

export async function Footer() {
    const settings = await getSettings();

    const description = settings.footer_description || 'Administración de propiedad horizontal con transparencia, eficiencia y compromiso social. Su patrimonio en las mejores manos.';
    const address = settings.contact_address || 'Av. Calle 34 # 24 – 05 Of 206, Bogotá, Colombia';
    const phone1 = settings.contact_phone_1 || '310 297 1834';
    const phone2 = settings.contact_phone_2 || '314 306 7529';
    const email = settings.contact_email || 'gerencia@abcpropiedadhorizontal.com';
    const facebookUrl = settings.facebook_url || 'https://www.facebook.com/p/ABC-Propiedad-Horizontal-100063958361522/';
    const instagramUrl = settings.instagram_url || 'https://www.instagram.com/abcpropiedadhorizontal/';

    return (
        <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <p className="text-sm leading-6 text-gray-300 italic">
                            "{description}"
                        </p>
                        <div className="flex space-x-6">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Servicios</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="/servicios" className="text-sm leading-6 text-gray-300 hover:text-white">Administración Integral</Link></li>
                                    <li><Link href="/servicios" className="text-sm leading-6 text-gray-300 hover:text-white">Contabilidad PH</Link></li>
                                    <li><Link href="/servicios" className="text-sm leading-6 text-gray-300 hover:text-white">Gestión Legal</Link></li>
                                    <li><Link href="/servicios" className="text-sm leading-6 text-gray-300 hover:text-white">Mantenimiento</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Empresa</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="/nosotros" className="text-sm leading-6 text-gray-300 hover:text-white">Quiénes Somos</Link></li>
                                    <li><Link href="/nosotros#mision" className="text-sm leading-6 text-gray-300 hover:text-white">Misión y Visión</Link></li>
                                    <li><Link href="/contacto" className="text-sm leading-6 text-gray-300 hover:text-white">Contacto</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contáctenos</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex gap-x-3">
                                        <MapPin className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        <span className="text-sm leading-6 text-gray-300">{address}</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <Phone className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        <span className="text-sm leading-6 text-gray-300">
                                            <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:text-white transition">{phone1}</a>
                                            <br />
                                            <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-white transition">{phone2}</a>
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <Mail className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        <a href={`mailto:${email}`} className="text-sm leading-6 text-gray-300 hover:text-white">{email}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} Grupo ABC Propiedad Horizontal SAS BIC. Todos los derechos reservados.</p>
                    <div className="text-xs leading-5 text-gray-400 text-center md:text-right flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
                        <span>Desarrollado por</span>
                        <a href="https://www.nestorovallos.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-white transition">Néstor Ovallos Cañas</a>
                        <span className="hidden sm:inline">|</span>
                        <a href="https://www.portafoliocreativo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">www.portafoliocreativo.com</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
