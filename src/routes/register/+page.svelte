<script>
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	
	import register from '../service/register';
	


	async function showAlert() {
		const email = document.getElementById('email').value;
		const nama = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		
		await register(email, password, nama).then((res) => {
			Swal.fire({
				title: 'Sukses',
				text: 'Harap tunggu verifikasi admin',
				icon: 'success',
				confirmButtonText: 'OK',
				timer: 3000
			});
		}).catch((err) => {
			Swal.fire({
				title: 'Gagal',
				text: 'Harap coba lagi',
				icon: 'error',
				confirmButtonText: 'OK',
				timer: 3000
			});
		});

	}
</script>

<div class="w-full h-screen flex items-center bg-gray-100">
	<section class="flex items-stretch justify-center w-full">
		<div class="formContainer w-11/12 border-2 p-6 rounded-xl bg-white">
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
							class="formInput w-full p-2 border-2 rounded-md my-1 color-grey"
						/>
					</div>
					<div class="formGroup my-3">
						<label for="username">Username</label><br />
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							class="formInput w-full p-2 border-2 rounded-md my-1 color-grey"
						/>
					</div>
					<div class="formGroup">
						<label for="password">Password</label><br />
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							class="formInput w-full p-2 border-2 rounded-md my-1"
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
