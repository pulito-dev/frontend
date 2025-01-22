import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth()
    
    if (!session)
        error(401, "Not authenticated")
    
    return { session }
}