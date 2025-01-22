<script>
    let formData = {
      name: '',
      postcode: '',
      address: '',
      country: '',
      city: ''
    };
    import { enhance } from "$app/forms";
  
    export let form;
  </script>
  
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Create New Accommodation</h1>
  
    {#if form?.errorMessage}
      <div class="mb-4 text-red-600">{form?.errorMessage}</div>
    {/if}
  
    <form method="post" use:enhance class="space-y-4 max-w-md mx-auto">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          bind:value={formData.name}
          class="w-full p-2 border rounded"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Postcode</label>
        <input
          type="text"
          name="postcode"
          bind:value={formData.postcode}
          class="w-full p-2 border rounded"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          bind:value={formData.address}
          class="w-full p-2 border rounded"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          bind:value={formData.country}
          class="w-full p-2 border rounded"
          required
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          bind:value={formData.city}
          class="w-full p-2 border rounded"
          required
        />
      </div>
  
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Create Accommodation
      </button>
    </form>
  </div>
  
  <style>
    /* Optional custom styles */
  </style>
  