import { API_URL } from "$lib/server"
import type { PageServerLoad } from "../$types";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth()
    
    if (!session)
        error(401, "Not authenticated")

    const response = await fetch(`${API_URL}/accommodations/${event.params.id}`, {
        headers: {
            Authorization: `Bearer ${session.idToken}`
        }
    })

    if (response.status == 404)
        error(404, "Accommodation not found")

    if (!response.ok)
        error(500, "Something went wrong")

    const accommodation = await response.json()


    return {
        session,
        accommodation: accommodation
    }
}

export const actions: Actions = {
    default: async ({ request, params, locals }) => {
        const formData = await request.formData();
        const session = await locals.auth()
  
        const updatedAccommodation = {
            name: formData.get('name'),
            postcode: formData.get('postcode'),
            address: formData.get('address'),
            country: formData.get('country'),
            city: formData.get('city')
        };
  
  
        const response = await fetch(`${API_URL}/accommodations/${params.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${session.idToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedAccommodation)
        })

        if (response.status == 400) {
            const errorMessage = (await response.json()).detail
            console.log(errorMessage)
            return fail(response.status, { errorMessage });
        }

        if (response.status == 500) {
            const errorMessage = (await response.json()).detail
            return error(response.status, errorMessage);
        }

        throw redirect(303, `/accommodations/${params.id}`);
    }
  };