<script>
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	
	import register from '../service/register';
	


	async function showAlert() {
		const email = document.getElementById('email').value;
		const nama = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const judul = document.getElementById('judul').value;

		if (!email || !nama || !password || !judul)  {
			Swal.fire({
				title: 'Error',
				text: 'Please fill in all fields',
				icon: 'error',
				confirmButtonText: 'OK',
				timer: 3000
			});
			return;
		}

		// Check if password length is at least 6 characters
		if (password.length < 6) {
			Swal.fire({
				title: 'Error',
				text: 'Password must be at least 6 characters long',
				icon: 'error',
				confirmButtonText: 'OK',
				timer: 3000
			});
			return;
		}
		await register(email, password, nama, judul).then((res) => {

			
		}).catch((err) => {
			Swal.fire({
				title: 'Gagal',
				text: 'Email sudah terdaftar',
				icon: 'error',
				confirmButtonText: 'OK',
				timer: 3000
			});
		});

	}
</script>

<div class="w-full h-screen flex items-center bg-gray-100">
	<section class="flex items-stretch justify-center w-full">
		<div class="formContainer w-6/12  p-6 rounded-xl bg-white">
			<div class="Logo m-50 flex justify-center">
				<img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP" class="m-5" />
			</div>
			<div class="formHeader text-center">
				<h1 class="text-xl text-title-text/90 font-bold">
					Sistem Informasi Penjadwalan Sidang Universitas Pertamina
				</h1>
			</div>
			<div class="formBody">
				<div action="" method="post" class="">
					<div class="formGroup my-3">
						<label for="username">Email</label><br />
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray focus:border-primary"
						/>
					</div>
					<div class="formGroup my-3">
						<label for="username">Username</label><br />
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						/>
					</div>
					<div class="formGroup my-3 ">
						<label for="judul">Judul</label><br />
						<input
							type="text"
							name="judul"
							id="judul"
							placeholder="Judul"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
							/>
					</div>
					<div class="formGroup">
						<label for="password">Password</label><br />
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						/>
					</div>
					<div class="formGroup text-center text-white">
						<br />
						<button
							on:click={showAlert}
							
							class="formButton border-2 px-5 py-2 rounded-md bg-primary/90"
						>
							<a href="">Register</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
