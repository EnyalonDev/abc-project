export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Panel de Control</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Cards */}
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium truncate text-gray-500">Servicios Activos</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">7</dd>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium truncate text-gray-500">Noticias Publicadas</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium truncate text-gray-500">Mensajes Nuevos</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                </div>
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Bienvenido</h2>
                <p className="text-gray-600">
                    Desde este panel podrá administrar el contenido del sitio web del Grupo ABC Propiedad Horizontal.
                    Utilice el menú lateral para gestionar los servicios, noticias y la información de contacto.
                </p>
            </div>
        </div>
    );
}
