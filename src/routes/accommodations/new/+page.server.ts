import { API_URL } from '$lib/server.js';
import { error, fail, redirect } from '@sveltejs/kit';


export const actions = {
  default: async ({ request, fetch, locals }) => {
    const session = await locals.auth()
    const formData = await request.formData();
    const accommodation = {
      name: formData.get('name'),
      postcode: formData.get('postcode'),
      address: formData.get('address'),
      country: formData.get('country'),
      city: formData.get('city'),
    };

        const response = await fetch(`${API_URL}/accommodations/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.idToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accommodation)
        });


        if (response.status == 400) {
            const errorMessage = (await response.json()).detail
            return fail(response.status, { errorMessage });
        }

        if (response.status == 500) {
            const errorMessage = (await response.json()).detail
            return error(response.status, errorMessage);
        }

        throw redirect(303, '/accommodations');
  }
};