<script lang="ts">
    import { goto } from '$app/navigation';
    import { redirect } from '@sveltejs/kit';

    let { data } = $props();
    
    let accommodation = data.accommodation
    let session = data.session

    async function reportAccommodation(id: number){
        const response = await fetch("/reports", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accommodation_id: id
            })
        });

        const body = await response.json();
        let msg
        if (response.ok)
            msg = body.msg
        else
            msg = body.detail
        
        confirm(msg)
    }
    async function deleteAccommodation(){
        const response = await fetch(`/accommodations/${accommodation.id}/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const body = await response.json();
        if (!response.ok)
            confirm(body.msg)
        else
            goto("/accommodations")
        
    }
</script>

<div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">{accommodation.name}</h1>
    
  
    <div class="p-4 border rounded shadow">
      <p><span class="font-semibold">Address:</span> {accommodation.address}, {accommodation.city}</p>
      <p><span class="font-semibold">Postcode:</span> {accommodation.postcode}</p>
      <p><span class="font-semibold">Country:</span> {accommodation.country}</p>
    </div>

    <div class="mt-4 space-x-4">
        {#if session.dbUser?.id == accommodation.user_id}
            <a href={`/accommodations/${accommodation.id}/edit`} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</a>
            <button onclick={deleteAccommodation} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
        {:else}
            <button onclick={async () => { await reportAccommodation(accommodation.id)}} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Report</button>
        {/if}
        </div>
  </div>