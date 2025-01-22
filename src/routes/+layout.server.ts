import { API_URL } from "$lib/server"
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()

    let isAdmin = false
    if (session) {
        const response = await fetch(`${API_URL}/roles/${session.dbUser.role_id}`, {
            headers: {
                Authorization: `Bearer ${session.idToken}`
            }
        })

        if (response.ok) {
            isAdmin = (await response.json()).name == "ADMIN"
        }
    }


    return {
        isAdmin: isAdmin,
        session,
    }
}