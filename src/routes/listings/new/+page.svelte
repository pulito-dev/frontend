<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import moment from "moment-timezone";

    interface Accommodation {
        id: number;
        name: string;  // Assuming accommodations have names
    }

    
    export let data: { accommodations: Accommodation[] };
    export let form;
    
    let options = []
    data.accommodations.forEach(acc => 
        options.push({
            id: acc.id,
            name: acc.name
        })
    )
    let now = moment().set("second", 0).set("millisecond", 0);

    let formData = {
        selectedAccommodation: "Select an accommodation",
        description: "",
        payout: 20,
        cleanFrom: now.toISOString().slice(0,-1),
        cleanBefore:  now.add({hours: 1}).toISOString().slice(0,-1),
    }


</script>

<div class="container mx-auto px-4 py-8 max-w-xl">
   <div class="flex justify-between items-center mb-6">
       <h1 class="text-2xl font-bold">Create New Listing</h1>
       <a 
           href="/listings"
           class="text-gray-600 hover:text-gray-800"
       >
           Cancel
       </a>
   </div>
   {#if form?.errorMessage}
      <div class="mb-4 text-red-600">{form?.errorMessage}</div>
    {/if}

   <form
        method="POST"
        use:enhance
       class="space-y-6 bg-white rounded-lg shadow p-6"
   >
       <div class="space-y-2">
           <label class="block text-sm font-medium text-gray-700">
               Select Accommodation
           </label>
           
           <select
               bind:value={formData.selectedAccommodation}
               class="w-full p-2 border rounded-md"
               required
               name="accommodation_id"
           >
               <!-- <option value="" selected disabled>{placeholder}</option> -->
               {#each options as accommodation}
                   <option value={accommodation.id}>
                       {accommodation.name}
                   </option>
               {/each}
           </select>
       </div>

       <div class="space-y-2">
           <label class="block text-sm font-medium text-gray-700">
               Clean From
           </label>
           <input
                name="cleaned_from"
               type="datetime-local"
               min={formData.cleanFrom}
               bind:value={formData.cleanFrom}
               class="w-full p-2 border rounded-md"
               required
           />
       </div>

       <div class="space-y-2">
           <label class="block text-sm font-medium text-gray-700">
               Clean Before
           </label>
           <input
                name="cleaned_before"
               type="datetime-local"
               bind:value={formData.cleanBefore}
               min={formData.cleanBefore}
               class="w-full p-2 border rounded-md"
               required
           />
       </div>

       <div class="space-y-2">
           <label class="block text-sm font-medium text-gray-700">
               Payout Amount ($)
           </label>
           <input 
                name="payout"
               type="number"
               bind:value={formData.payout}
               min="0.01"
               step="0.01"
               class="w-full p-2 border rounded-md"
               required
           />
       </div>

       <div class="space-y-2">
           <label class="block text-sm font-medium text-gray-700">
               Description
           </label>
           <textarea
                name="description"
               bind:value={formData.description}
               rows="3"
               class="w-full p-2 border rounded-md"
               placeholder="Enter cleaning details..."
           ></textarea>
       </div>

       <div class="pt-4">
           <button
               type="submit"
               class="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                      hover:bg-blue-700 transition-colors"
           >
               Create Listing
           </button>
       </div>
   </form>
</div>