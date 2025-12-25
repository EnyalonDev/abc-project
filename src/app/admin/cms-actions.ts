'use server';

import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

// Helper to verify session cookie in server actions
async function verifyAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (session?.value !== 'true') {
        throw new Error('No autorizado');
    }
}

// Settings Actions
export async function saveSiteSettings(settings: { key: string, value: string }[]) {
    await verifyAdmin();

    try {
        for (const setting of settings) {
            const { error } = await supabaseAdmin
                .from('site_settings')
                .update({ value: setting.value })
                .eq('key', setting.key);

            if (error) throw error;
        }
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('saveSiteSettings error:', error);
        return { success: false, error: error.message };
    }
}

// Services Actions
export async function saveServiceAction(service: any, isNew: boolean) {
    await verifyAdmin();

    try {
        const { id, ...data } = service;
        let result;

        if (isNew) {
            result = await supabaseAdmin.from('services').insert([data]);
        } else {
            result = await supabaseAdmin.from('services').update(data).eq('id', id);
        }

        if (result.error) throw result.error;

        revalidatePath('/servicios');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('saveServiceAction error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteServiceAction(id: string) {
    await verifyAdmin();

    try {
        const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/servicios');
        return { success: true };
    } catch (error: any) {
        console.error('deleteServiceAction error:', error);
        return { success: false, error: error.message };
    }
}

// Highlights/Values Actions
export async function saveHighlightAction(item: any, isNew: boolean, table: string) {
    await verifyAdmin();

    try {
        const { id, table: _, ...data } = item;
        let result;

        if (isNew) {
            result = await supabaseAdmin.from(table).insert([data]);
        } else {
            result = await supabaseAdmin.from(table).update(data).eq('id', id);
        }

        if (result.error) throw result.error;

        revalidatePath('/');
        revalidatePath('/nosotros');
        return { success: true };
    } catch (error: any) {
        console.error('saveHighlightAction error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteHighlightAction(id: string, table: string) {
    await verifyAdmin();

    try {
        const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/');
        revalidatePath('/nosotros');
        return { success: true };
    } catch (error: any) {
        console.error('deleteHighlightAction error:', error);
        return { success: false, error: error.message };
    }
}
