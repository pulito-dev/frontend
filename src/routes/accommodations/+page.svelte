<script lang="ts">
let { data } = $props();

</script>

<div class="container mx-auto py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Available Accommodations</h1>
    <a href="/accommodations/new" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Create New</a>
  
  </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.accommodation_data as accommodation}
        <a href={`/accommodations/${accommodation.id}`} class="block p-4 border rounded shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold">{accommodation.name}</h2>
          <p class="text-gray-600">{accommodation.address}, {accommodation.city}</p>
          <p class="text-gray-600">{accommodation.postcode}, {accommodation.country}</p>
        </a>
      {/each}
    </div>
  </div>