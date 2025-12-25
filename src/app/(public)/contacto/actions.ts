'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitContactMessage(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, error: 'Todos los campos son obligatorios.' };
    }

    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, message }]);

        if (error) throw error;

        // Revalidate the admin messages page if it exists
        revalidatePath('/admin/messages');

        return { success: true };
    } catch (error: any) {
        console.error('Contact submission error:', error);
        return { success: false, error: 'Ocurrió un error al enviar el mensaje. Por favor intente más tarde.' };
    }
}
