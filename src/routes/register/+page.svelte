<script>
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
	
	import register from '../service/register';
	import getAllDosen from '../service/getAllDosen';

	let dosen = []
	onMount(async () => {
		await getAllDosen().then((res) => {
			dosen = res;
		});
		
	});

	async function showAlert() {
		const email = document.getElementById('email').value;
		const nama = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const judul = document.getElementById('judul').value;
		const dosenPembimbing1 = document.getElementById('dosenPembimbing1').value;
		const dosenPembimbing2 = document.getElementById('dosenPembimbing2').value;
		const dosenPenguji1 = document.getElementById('dosenPenguji1').value;
		const dosenPenguji2 = document.getElementById('dosenPenguji2').value;
		const dosenPenguji3 = document.getElementById('dosenPenguji3').value;


		if (!email || !nama || !password || !judul || !dosenPembimbing1  || !dosenPenguji1 || !dosenPenguji2 )  {
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
		await register(email, password, nama, judul, dosenPembimbing1, dosenPembimbing2, dosenPenguji1,dosenPenguji2, dosenPenguji3).then((res) => {

			
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
				<form  on:submit={showAlert}>
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
					<div class="dosenInput flex justify-around">
						<div class="left w-5/12">
						  <label for="dosenPembimbing1">Dosen Pembimbing 1</label><br />
						  <select
							name="dosenPembimbing1"
							id="dosenPembimbing1"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						  >
							<option value="" disabled selected>Select Dosen Pembimbing 1</option>
							{#each dosen as dosen}
								<option value={dosen.nama}>{dosen.nama}</option>
							{/each}
							<!-- Add more options for Dosen Pembimbing 1 dropdown -->
						  </select>
					  
						  <label for="dosenPembimbing2">Dosen Pembimbing 2</label><br />
						  <select
							name="dosenPembimbing2"
							id="dosenPembimbing2"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						  >
							<option value="" disabled selected>Select Dosen Pembimbing 2</option>
							{#each dosen as dosen}
							<option value={dosen.nama}>{dosen.nama}</option>
						{/each}
							<!-- Add more options for Dosen Pembimbing 2 dropdown -->
						  </select>
						</div>
						<div class="right w-5/12">
						  <label for="dosenPenguji1">Dosen Penguji 1</label><br />
						  <select
							name="dosenPenguji1"
							id="dosenPenguji1"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						  >
							<option value="" disabled selected>Select Dosen Penguji 1</option>
							{#each dosen as dosen}
							<option value={dosen.nama}>{dosen.nama}</option>
						{/each}
							<!-- Add more options for Dosen Penguji 1 dropdown -->
						  </select>
					  
						  <label for="dosenPenguji2">Dosen Penguji 2</label><br />
						  <select
							name="dosenPenguji2"
							id="dosenPenguji2"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						  >
							<option value="" disabled selected>Select Dosen Penguji 2</option>
							{#each dosen as dosen}
							<option value={dosen.nama}>{dosen.nama}</option>
						{/each}
							<!-- Add more options for Dosen Penguji 2 dropdown -->
						  </select>
					  
						  <label for="dosenPenguji3">Dosen Penguji 3</label><br />
						  <select
							name="dosenPenguji3"
							id="dosenPenguji3"
							class="formInput w-full p-2 border-2 rounded-md my-1 border-gray"
						  >
							<option value="" disabled selected>Select Dosen Penguji 3</option>
							{#each dosen as dosen}
								<option value={dosen.nama}>{dosen.nama}</option>
							{/each}
							<!-- Add more options for Dosen Penguji 3 dropdown -->
						  </select>
						</div>
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
				</form>
			</div>
		</div>
	</section>
</div>
