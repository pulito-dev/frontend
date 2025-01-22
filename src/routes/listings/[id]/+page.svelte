<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;

    const formatPayout = (payout: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(parseFloat(payout));
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    async function acceptListing() {
        try {
            const response = await fetch(`/api/listings/${data.listing.id}/accept`, {
                method: 'POST',
            });

            if (response.ok) {
                // Navigate to accepted listings or show success message
                alert('Listing accepted successfully!');
                goto('/listings/my-listings');
            } else {
                throw new Error('Failed to accept listing');
            }
        } catch (error) {
            alert('Failed to accept listing');
        }
    }
</script>

<div class="container mx-auto px-4 py-8 max-w-3xl">
    <button 
        class="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        on:click={() => goto('/listings')}
    >
        ← Back to Listings
    </button>

    <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-start mb-6">
            <h1 class="text-3xl font-bold">
                Cleaning Job #{data.listing.id}
            </h1>
            <span class="text-2xl text-green-600 font-bold">
                {formatPayout(data.listing.payout)}
            </span>
        </div>

        <div class="space-y-6">
            <div class="border-b pb-4">
                <h2 class="text-xl font-semibold mb-2">Schedule</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600">Start Time</p>
                        <p class="font-medium">
                            {formatDateTime(data.listing.to_be_cleaned_from)}
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-600">End Time</p>
                        <p class="font-medium">
                            {formatDateTime(data.listing.to_be_cleaned_before)}
                        </p>
                    </div>
                </div>
            </div>

            <div class="border-b pb-4">
                <h2 class="text-xl font-semibold mb-2">Accommodation</h2>
                <a href="/accommodations/{data.accommodation.id}" class="hover:text-blue-800">
                    {data.accommodation.name}
                </a>
            </div>

            {#if data.listing.description}
                <div class="border-b pb-4">
                    <h2 class="text-xl font-semibold mb-2">Description</h2>
                    <p class="text-gray-800 whitespace-pre-line">
                        {data.listing.description}
                    </p>
                </div>
            {/if}

            <div class="text-sm text-gray-600">
                Posted: {formatDateTime(data.listing.posted_on)}
            </div>
        </div>
    </div>
</div>