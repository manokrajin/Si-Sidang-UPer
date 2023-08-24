<script>
	import '../app.css';

	import { onMount, onDestroy } from 'svelte';
	import { userStore } from './login/loginStore';


	import NavbarLoginDosen from './dosen/NavbarLoginDosen.svelte';
	import NavbarLogin from './navbarLogin.svelte';
	import Navbar from './navbar.svelte';

	let userRole = ''; // Create a local variable to store the user role
	let userActive = null;
	// Subscribe to changes in the userStore
	const unsubscribe = userStore.subscribe((user) => {
		userActive = user;
		userRole = user.user.role;
	});
	// Unsubscribe when the component is destroyed
	onDestroy(unsubscribe);
</script>

<div class="app">

		<header>
			{#if userActive && userRole === 'mahasiswa'}
				<NavbarLogin />
			{:else if userActive && userRole === 'dosen'}
				<NavbarLoginDosen />
			{:else if userActive && userRole === 'admin'}
            {:else}
				<Navbar />
			{/if}
		</header>
	

	<main>
		<slot />
	</main>

	<footer>
		<p>manokrajin 2023</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Ensures the app takes at least the full viewport height */
	}

	main {
		flex: 1; /* Allows main content to take remaining vertical space */
	}

	footer {
		text-align: center;
		padding: 10px 0;
		background-color: #f0f0f0;
		width: 100%;
		position: relative; /* To position the footer at the bottom */
		bottom: 0; /* To stick the footer at the bottom */
	}
</style>
