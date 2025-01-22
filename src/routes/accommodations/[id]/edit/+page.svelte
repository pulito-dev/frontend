<script>
	import { enhance } from '$app/forms';

    let { data, form} = $props();
    let { name, postcode, address, country, city } = data.accommodation;
  </script>
  
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Edit Accommodation</h1>
  
    {#if form?.errorMessage}
      <div class="mb-4 text-red-600">{form.errorMessage}</div>
    {/if}
  
    <form method="POST" use:enhance class="space-y-4 max-w-md mx-auto">
      <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input id="name" name="name" bind:value={name} required class="w-full p-2 border rounded" />
      </div>
  
      <div>
        <label for="postcode" class="block text-sm font-medium">Postcode</label>
        <input id="postcode" name="postcode" bind:value={postcode} required class="w-full p-2 border rounded" />
      </div>
  
      <div>
        <label for="address" class="block text-sm font-medium">Address</label>
        <input id="address" name="address" bind:value={address} required class="w-full p-2 border rounded" />
      </div>
  
      <div>
        <label for="country" class="block text-sm font-medium">Country</label>
        <input id="country" name="country" bind:value={country} required class="w-full p-2 border rounded" />
      </div>
  
      <div>
        <label for="city" class="block text-sm font-medium">City</label>
        <input id="city" name="city" bind:value={city} required class="w-full p-2 border rounded" />
      </div>
  
      <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Update</button>
    </form>
  </div>