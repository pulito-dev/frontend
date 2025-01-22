import { error } from "@sveltejs/kit";
import { API_URL } from "$lib/server"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth()
    
    if (!session)
        error(401, "Not authenticated")

    const response = await fetch(`${API_URL}/accommodations/`, {
        headers: {
            Authorization: `Bearer ${session.idToken}`
        }
    })

    if (!response.ok)
        error(500, "Something went wrong")

    const accommodations = await response.json()

    return {
        accommodation_data: accommodations.data
    }
}