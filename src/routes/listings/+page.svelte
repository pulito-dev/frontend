<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    // Format currency
    const formatPayout = (payout: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(parseFloat(payout));
    };

    // Format date for display
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Available Listings</h1>
    <a href="/listings/new" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Create New</a>
    <br>
    <br>

    {#if data.listings.length === 0}
        <p class="text-gray-600">No listings available at the moment.</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each data.listings as listing (listing.id)}
            <a href="/listings/{listing.id}">
                <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-semibold">Accommodation #{listing.accommodation_id}</h2>
                        <span class="text-green-600 font-bold">{formatPayout(listing.payout)}</span>
                    </div>

                    <div class="space-y-2 text-gray-600">
                        <p class="text-sm">
                            <span class="font-semibold">Clean between:</span><br />
                            {formatDateTime(listing.to_be_cleaned_from)} -<br />
                            {formatDateTime(listing.to_be_cleaned_before)}
                        </p>

                        {#if listing.description}
                            <p class="mt-4">
                                <span class="font-semibold">Description:</span><br />
                                {listing.description}
                            </p>
                        {/if}

                        <p class="text-xs text-gray-500 mt-4">
                            Posted: {formatDateTime(listing.posted_on)}
                        </p>
                    </div>
                </div>
            </a>
            {/each}
        </div>
    {/if}
</div>