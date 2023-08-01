<script>
    import "../app.css";
   
    import { onMount } from 'svelte';
	import { userStore } from "./login/loginStore";

    let url = ``;

    onMount(() => url = window.location.href);

	import NavbarLoginDosen from "./dosen/NavbarLoginDosen.svelte";
	import NavbarLogin from "./navbarLogin.svelte";
	import Navbar from "./navbar.svelte";

    
  

  </script>

<div class="app">

	<header>
		{#if $userStore.user.role == 'mahasiswa'}
			<NavbarLogin />
		{:else if $userStore.user.role == 'dosen'}
			<NavbarLoginDosen />
		{:else if !$userStore.user.role}
		<Navbar />
		{:else}
				
		{/if}
	</header>



	<main>
		<slot />
	</main>

	<footer>
		<p>manokrajin 2023</p>
	</footer>
</div>
