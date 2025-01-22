import { API_URL } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Listing {
    id: number;
    description: string;
    payout: string;
    to_be_cleaned_from: string;
    to_be_cleaned_before: string;
    posted_on: string;
    accommodation_id: number;
}

export const load: PageServerLoad = async ({ fetch, locals }) => {
    const session = await locals.auth()

    if (!session)
        error(401, "Not authenticated")

    const response = await fetch(`${API_URL}/listings/`, {
            headers: {
                Authorization: `Bearer ${session?.idToken}`
            }
        })
    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }
    const listings: Listing[] = (await response.json()).data;

    return { listings };
};