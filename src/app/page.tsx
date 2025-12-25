import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 opacity-90 z-10" />
        {/* Decorative pattern */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}></div>

        <FadeIn className="relative z-20 max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center" direction="up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 drop-shadow-md">
            Su Patrimonio en las <br className="hidden sm:block" /> Mejores Manos
          </h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl leading-relaxed">
            Gestión profesional de propiedad horizontal en Colombia. Garantizamos transparencia, seguridad y valorización para su conjunto residencial o edificio corporativo.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/contacto" className="rounded-md bg-accent px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all transform hover:scale-105">
              Solicitar Propuesta
            </Link>
            <Link href="/servicios" className="rounded-md bg-white/10 px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-white/50 backdrop-blur-sm transition-all">
              Nuestros Servicios
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Highlights / Value Proposition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16" delay={0.2}>
            <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-wider">Por qué elegirnos</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Más que administradores, somos sus aliados estratégicos
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Cumplimos estrictamente la Ley 675 de 2001, asegurando una convivencia armónica y una gestión financiera impecable.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Seguridad y Confianza',
                description: 'Protegemos los intereses de la copropiedad con pólizas de cumplimiento y un manejo transparente de los recursos.',
              },
              {
                icon: TrendingUp,
                title: 'Valorización del Patrimonio',
                description: 'Implementamos planes de mantenimiento preventivo y mejoras que aseguran que su propiedad gane valor en el tiempo.',
              },
              {
                icon: Users,
                title: 'Convivencia Armónica',
                description: 'Fomentamos el respeto y la cultura ciudadana mediante una gestión humana y cercana a los residentes.',
              },
            ].map((feature, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="flex flex-col items-start p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 feature-card">
                <div className="rounded-lg bg-primary/10 p-3 mb-6">
                  <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold leading-7 text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-base leading-7 text-gray-600">{feature.description}</p>
              </FadeIn>
            ))}
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
            {['Administración Delegada', 'Contabilidad PH', 'Gestión de Cartera', 'Asesoría Jurídica', 'Mantenimiento General', 'Gestión de Proyectos', 'Atención al Residente', 'Gestión Documental'].map((service, idx) => (
              <FadeIn key={service} delay={0.05 * idx} direction="up" className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="font-medium text-gray-900">{service}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 sm:py-24">
        <FadeIn className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Listo para mejorar la administración de su copropiedad?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Contáctenos hoy mismo para recibir una propuesta personalizada adaptada a las necesidades de su edificio o conjunto.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contacto"
              className="rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Contáctenos
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
