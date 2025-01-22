import { error } from "@sveltejs/kit";
import { API_URL } from "$lib/server"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth()
    
    if (!session)
        error(401, "Not authenticated")

    let isAdmin = false
    let response
    if (session) {
        response = await fetch(`${API_URL}/roles/${session.dbUser.role_id}`, {
            headers: {
                Authorization: `Bearer ${session.idToken}`
            }
        })

        if (response.ok) {
            isAdmin = (await response.json()).name == "ADMIN"
        }
    }
    if (!isAdmin)
        error(403, "Admins only")
    

    response = await fetch(`${API_URL}/reports`, {
        headers: {
            Authorization: `Bearer ${session.idToken}`
        }
    })

    if (!response.ok)
        error(500, "Something went wrong")

    const reports = await response.json()

    return {
        reports: reports.data
    }
}