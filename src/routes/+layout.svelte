<script lang="ts">
  import "../app.css";
  import { SignIn } from "@auth/sveltekit/components"
  
	let { data, children } = $props();
</script>

<nav class="flex items-center justify-between flex-wrap bg-purple-500 p-4">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <a href="/" class="font-bold text-4xl tracking-tight hover:tracking-wide">Pulito</a>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="/accommodations" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-semibold">
        Accommodations
      </a>
      <a href="/listings" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-semibold">
        Listings
      </a>
      {#if data.isAdmin}
        <a href="/reports" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-semibold">
          Admin panel
        </a>
      {/if}
    </div>
    <div>
      {#if data.session}
        {#if data.session.user?.picture}
        <a href="/profile" class="flex items-center">
          <img
          src={data.session.user.picture}
          class="h-8 w-8 rounded-full object-cover hover:outline outline-offset-1 outline-white"
          alt="User Avatar"
          />
        </a>
        {/if}
      {:else}
        <SignIn provider="auth0">
          <div slot="submitButton" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-900 hover:bg-white mt-4 lg:mt-0">Sign in</div>
        </SignIn>
      {/if}
    </div>
  </div>
</nav>

{@render children()}