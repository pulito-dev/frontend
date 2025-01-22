import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$lib/server';

export const POST: RequestHandler = async ({ fetch, request, locals }) => {

    const session = await locals.auth()

    // This URL is only known to the server
    const body = await request.json()
    const response = await fetch(`${API_URL}/reports/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.idToken}`
        },
        body: JSON.stringify(body)
    });

    const responseBody = await response.json()
    
    return json(responseBody, {status: response.status})
};