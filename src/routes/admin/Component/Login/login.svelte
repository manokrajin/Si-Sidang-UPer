<!-- LoginForm.svelte -->

<script>
	import Swal from 'sweetalert2';
	import { adminLoginStore } from '../../../login/adminLoginStore';
	import { loginUser } from '../../../service/loginAdmin';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';

	async function handleSubmit() {
		// Handle login logic here (e.g., sending login request to the server)
		console.log('Login form submitted!');
		try {
			await loginUser(email, password);
			if ($adminLoginStore.user.role == 'admin') {
				goto('/admin/addDosen');
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Email atau password salah!'
				});
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Email atau password salah!'
			});
		}
	}

	let isLoggedIn = false;
	const unsubscribe = adminLoginStore.subscribe((user) => {
		isLoggedIn = user.isLogin;
	});

	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			if (isLoggedIn) {
				if ($adminLoginStore.user.role == 'admin') {
					goto('/admin/addDosen');
				} else {
					goto('/admin');
				}
			} else {
				// If the user is not logged in, redirect them to the login page
				goto('/admin'); // Replace '/login' with the path to your login page
			}
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	});
</script>

<div class="flex items-center justify-center p-3">
	<form class="bg-white shadow-md rounded px-8 py-3 mb-4" on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email: </label>
			<input
				type="email"
				id="email"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password: </label>
			<input
				type="password"
				id="password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				bind:value={password}
				required
			/>
		</div>
		<div class="flex items-center justify-between">
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Login
			</button>
		</div>
	</form>
</div>
