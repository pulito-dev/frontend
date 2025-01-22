<script>
  import { SignOut } from "@auth/sveltekit/components"
  import { signOut } from "@auth/sveltekit/client";
  import { goto } from "$app/navigation";
  
  let { data } = $props();

  async function deleteUser(){
    if (confirm("Are you sure? This will delete everything you've done so far")) {
      const response = await fetch(`/profile`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok)
        return
      
      await signOut()
      goto("/")
  }
}
  

</script>
 
<div>
    <img
      src={data.session?.user?.picture}
      class="avatar"
      alt="User Avatar"
    />
  <span class="signedInText">
    <small>Signed in as</small>
    <strong>{data.session.user?.name ?? "User"}</strong>
    <br />
    <br />
    <p>
      {data.session?.idToken}
    </p>
    <br />
    <br />
  </span>
  <SignOut options={{
    redirectTo: "/"
  }}>
    <button slot="submitButton" class="bg-red-500 text-red rounded bg-white transition">Sign out</button>
  </SignOut>

  <button onclick={deleteUser} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
</div>