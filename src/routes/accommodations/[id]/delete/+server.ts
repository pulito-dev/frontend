import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$lib/server';

export const DELETE: RequestHandler = async ({ fetch, locals, params }) => {

    const session = await locals.auth()

    // This URL is only known to the server
    const response = await fetch(`${API_URL}/accommodations/${params.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.idToken}`
        },
    });

    const responseBody = await response.json()
    
    return json(responseBody, {status: response.status})
};