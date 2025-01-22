<script lang="ts">
    let { data } = $props();
    
</script>

<div class="container mx-auto py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Reports</h1>
    
    </div>
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {#each data.reports as report}
          <a href={`/accommodations/${report.accommodation_id}`} class="block p-4 border rounded shadow hover:shadow-lg transition">
            <h2 class="text-xl font-semibold">Accommodation {report.accommodation_id}</h2>
            <p class="text-gray-600">Reported by user {report.user_id}</p>
          </a>
        {/each}
      </div>
    </div>