import { error } from "@sveltejs/kit";
import { API_URL } from "$lib/server"
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth()
    
    if (!session)
        error(401, "Not authenticated")

    let response = await fetch(`${API_URL}/listings/${event.params.id}`, {
        headers: {
            Authorization: `Bearer ${session.idToken}`
        }
    })

    if (response.status == 404)
        error(404, "Accommodation not found")

    if (!response.ok)
        error(500, "Something went wrong")

    const listing = await response.json()

    response = await fetch(`${API_URL}/accommodations/${listing.accommodation_id}`, {
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
        listing: listing,
        accommodation: accommodation
    }
}