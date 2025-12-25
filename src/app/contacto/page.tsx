import { Mail, MapPin, Phone } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export default function ContactPage() {
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
                                <dd>
                                    Av. Calle 34 # 24 – 05 Of 206<br />
                                    Bogotá, Colombia
                                </dd>
                            </div>
                            <div className="flex gap-4">
                                <dt className="flex-none"><Phone className="w-6 h-6 text-primary" /></dt>
                                <dd>
                                    <a href="tel:+573102971834" className="hover:text-primary">310 297 1834</a> <br />
                                    <a href="tel:+573143067529" className="hover:text-primary">314 306 7529</a>
                                </dd>
                            </div>
                            <div className="flex gap-4">
                                <dt className="flex-none"><Mail className="w-6 h-6 text-primary" /></dt>
                                <dd>
                                    <a href="mailto:gerencia@abcpropiedadhorizontal.com" className="hover:text-primary">gerencia@abcpropiedadhorizontal.com</a>
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-12 bg-gray-100 p-6 rounded-lg text-sm text-gray-500">
                            <p className="font-semibold text-gray-900 mb-2">Horario de Atención</p>
                            <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                            <p>Sábados: 8:00 AM - 12:00 PM</p>
                        </div>
                    </FadeIn>

                    {/* Form */}
                    <FadeIn direction="left" delay={0.4}>
                        <form action="#" method="POST" className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Nombre Completo</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="name" id="name" autoComplete="name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Correo Electrónico</label>
                                    <div className="mt-2.5">
                                        <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Mensaje</label>
                                    <div className="mt-2.5">
                                        <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
