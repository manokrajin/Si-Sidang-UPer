<script>
	import { goto } from '$app/navigation';
	import { loginUser } from '../service/login';
	import { userStore } from './loginStore';
	import Swal from 'sweetalert2';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';

	let isLoggedIn = false;
	const unsubscribe = userStore.subscribe((user) => {
		isLoggedIn = user.isLogin;
	});

	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			if (isLoggedIn) {
				if ($userStore.user.role == 'mahasiswa') {
					goto('/mahasiswa/cekJadwal');
				} else {
					goto('/login');
				}
			} else {
				// If the user is not logged in, redirect them to the login page
				goto('/login'); // Replace '/login' with the path to your login page
			}
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	});
	
	async function handleLogin() {
		try {
			await loginUser(email, password);
			if($userStore.user.role == 'mahasiswa') {
				goto('/mahasiswa/cekJadwal');
            } else {
				goto('/login');
				Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email atau password salah',
                });
				return;
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Email atau password salah!'
			});
		}
	}

	
</script>

<div class="w-full h-screen flex items-center bg-gray-100">
	<section class="flex items-stretch justify-center w-full">
		<div class="formContainer w-6/12 p-6 rounded-xl bg-white">
			<div class="Logo m-50 flex justify-center">
				<img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP" class="m-5" />
			</div>
			<div class="formHeader text-center">
				<h1 class="text-xl text-title-text/90 font-bold">
					Sistem Informasi Penjadwalan Sidang Universitas Pertamina
				</h1>
			</div>
			<div class="formBody">
				<div class="formGroup my-3">
					<label for="email">Email</label><br />
					<input
						bind:value={email}
						type="text"
						name="email"
						id="email"
						placeholder="email"
						class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
					/>
				</div>
				<div class="formGroup">
					<label for="password">Password</label><br />
					<input
						bind:value={password}
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
					/>
				</div>
				<div class="formGroup text-center text-white">
					<br /><button
						type="submit"
						class="formButton border-2 px-5 py-2 rounded-md bg-primary/90"
						on:click={handleLogin}>Login</button
					>
				</div>
			</div>
			<div class="register">
				<p class="text-center">
					Belum punya akun? <a href="/register" class="text-primary/90">Daftar</a>
				</p>
			</div>
		</div>
	</section>
</div>
