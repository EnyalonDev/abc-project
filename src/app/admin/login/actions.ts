'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const user = formData.get('email');
    const pass = formData.get('password');

    const cookieStore = await cookies();
    const expectedUser = process.env.ABC_USER;
    const expectedPass = process.env.ABC_PASS;

    if (!expectedUser || !expectedPass) {
        console.error('Admin credentials not configured in environment variables');
        return { success: false, error: 'Error de configuración del servidor' };
    }

    // Map 'gerencia' to the planned email
    const loginEmail = user === 'gerencia' ? 'gerencia@abcpropiedadhorizontal.com' : (user as string);

    if (user === expectedUser && pass === expectedPass) {
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }

    return { success: false, error: 'Credenciales inválidas' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function checkSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === 'true';
}
