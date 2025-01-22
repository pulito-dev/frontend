import { error, redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { API_URL } from "$lib/server";


export const load: PageServerLoad = async ({ fetch, locals }) => {
    const session = await locals.auth()
    
    if (!session)
        error(401, "Not authenticated")
    
    const response = await fetch(`${API_URL}/accommodations/my`, {
        headers: {
            Authorization: `Bearer ${session.idToken}`
        }
    });

    
    if (!response.ok)
        throw error(500, "Failed to fetch accommodations");

    let accommodations = await response.json();
    accommodations = accommodations.data;

    return { accommodations };
};

export const actions = {
    default: async ({ request, fetch, locals }) => {
        const formData = await request.formData();
        const session = await locals.auth()
    
    if (!session)
        error(401, "Not authenticated")

    const listing = {
        accommodation_id: formData.get("accommodation_id"),
        description: formData.get("description"),
        payout: formData.get("payout"),
        to_be_cleaned_from: formData.get("cleaned_from"),
        to_be_cleaned_before: formData.get("cleaned_before"),
    };

    console.log(listing)

    const response = await fetch(`${API_URL}/listings/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.idToken}`
        },
        body: JSON.stringify(listing),
    });
    console.log(response.status)

    if (!response.ok) {
        const errorMessage = (await response.json()).detail
        console.log(errorMessage)
        return fail(response.status, { errorMessage });
    }


    throw redirect(303, "/listings/");
}} satisfies Actions;