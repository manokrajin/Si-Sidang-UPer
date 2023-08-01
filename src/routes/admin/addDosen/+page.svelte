<script>
// @ts-nocheck

	import Papa from 'papaparse';
	import registerDosen from '../../service/registerDosen';
	import { EmailAuthCredential } from 'firebase/auth';
	import { logoutUser } from '../../service/loginAdmin';
	import { goto } from '$app/navigation';
	import getAllSidang from '../../service/getAllSidang';
	import { adminLoginStore } from '../../login/adminLoginStore';
	import { onMount } from 'svelte';
	import { sidangStore } from '../service/sidangAdminStore';
	import { updateSidangDetail } from '../service/updateSidangDetail';
	import { setJadwal } from '../service/scheduler';

	// Your Firebase configuration

	// Initialize Firebase

	let csvData = '';
	let jsonData = [];
	let sidangData = [];

	let searchTerm = '';
	let filteredSidangStore = [];

	$: {
		filteredSidangStore = $sidangStore.filter((data) => {
			const name = data.mahasiswa ? data.mahasiswa.toLowerCase() : '';
			const judul = data.judul ? data.judul.toLowerCase() : '';
			return name.includes(searchTerm.toLowerCase()) || judul.includes(searchTerm.toLowerCase());
		});
	}

	function handleCsvData(event) {
		csvData = event.target.value;
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		if (file.type !== 'text/csv') {
			alert('Please select a CSV file.');
			return;
		}
		if (file) {
			Papa.parse(file, {
				skipEmptyLines: true,
				header: true,
				delimiter: ',',
				complete: (result) => {
					jsonData = result.data;
				}
			});
		}
	}

	async function registerJson() {
		for (const dosenData of jsonData) {
			const { email, password, nama } = dosenData
			console.log(email, password, nama)
			try {
				await registerDosen(email, password, nama);
				jsonData = [];
			} catch (error) {
				console.log(error);
			}
		}
	}

	let isLoggedIn = false;
	const unsubscribe = adminLoginStore.subscribe((user) => {
		isLoggedIn = user.isLogin;
	});
	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			if (isLoggedIn && $adminLoginStore.user.role == 'admin') {
				await getAllSidang().then((res) => {
					sidangStore.set(res);

				});
			} else {
				// If the user is not logged in, redirect them to the login page
				goto('/admin'); // Replace '/login' with the path to your login page
			}
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	});

	function logout() {
		logoutUser().then(() => {
			goto('/admin');
		});
	}

	async function updateJadwal(id) {
		const tanggal = document.getElementById('tanggal-' + id).value;
		const jam = document.getElementById('jam-' + id).value;
		try {
			await updateSidangDetail(id, tanggal, jam);
			// Update the sidangStore with the new values
			sidangStore.update((sidangList) => {
				return sidangList.map((sidang) => {
					if (sidang.id === id) {
						return {
							...sidang,
							tanggal: tanggal,
							waktu: jam
						};
					}
					return sidang;
				});
			});
		} catch (error) {
			console.log(error);
		}
	}

	setJadwal(sidangData).then((res) => {
		console.log(sidangData, "ini aku");
		console.log(res);
	});
</script>

<main class="flex flex-col bg-gray/20">
	<button
		on:click={logout}
		class="bg-blue-500 hover:bg-red-alert transition text-white p-2 w-1/12 rounded-md mx-auto"
	>
		logout
	</button>
	<div class="container bg-gray/50 p-3 rounded-xl flex flex-col mx-auto py-8">
		<h1 class="text-3xl font-bold mb-4">Tambah Akun Dosen</h1>
		<h2>file csv only</h2>
		<input type="file" accept=".csv" class="mb-4" on:change={handleFileUpload} />
		{#if jsonData.length > 0}
			<pre class="bg-gray-100 p-4 rounded">{JSON.stringify(jsonData, null, 2)}</pre>
		{/if}
		<br />
		<button
			class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded m-4 flex w-1/8 text-center mx-auto px-auto"
			on:click={registerJson}>Register</button
		>
	</div>

	<div class="listSidang m-10 rounded-xl bg-white px-3">
		<div class="title text-center font-bold text-3xl m-10">
			<h1>List Sidang</h1>
		</div>
		<input
			type="text"
			placeholder="Search Here..."
			class="mb-4 p-2 rounded mx-auto w-full border"
			bind:value={searchTerm}
		/>

		{#each filteredSidangStore as sidangData}
			<div class="cards rounded-xl m-3">
				<div class="title bg-primary text-white p-4 rounded-t-xl">
					<div class="judul capitalize text-2xl">{sidangData.judul}</div>
				</div>
				<div class="content flex p-2">
					<div class="left w-1/2">
						Nama Mahasiswa : {sidangData.mahasiswa} <br />
						Dosen Pembimbing : {sidangData.dosenPembimbing1} <br />
						{#if sidangData.dosenPembimbing2}
							Dosen Pembimbing 2 : {sidangData.dosenPembimbing2} <br />
						{/if}
						Dosen Penguji : {sidangData.dosenPenguji1} <br />
						Dosen Penguji 2 : {sidangData.dosenPenguji2} <br />
						{#if sidangData.dosenPenguji3}
							Dosen Penguji 3 : {sidangData.dosenPenguji3} <br />
						{/if}
						{#if sidangData.tanggal != '-'}
							Tanggal : {sidangData.tanggal} <br />
						{/if}
						{#if sidangData.waktu != '-'}
							Jam : {sidangData.waktu} <br />
						{/if}
					</div>

					<div class="right w-1/2 flex">
						<div class="left-inner m-4 border-r pr-3">
							<button class="bg-primary/80 text-white p-3 rounded-xl"
							on:click={ () => setJadwal(sidangData)}
							> automasi jadwal </button>
						</div>
						<div class="right-inner p-3 flex">
							<div class="left">
								<span> atau upload manual : </span>
								<form
									action=""
									class="flex flex-col"
									on:submit|preventDefault={() => updateJadwal(sidangData.id)}
								>
									<input
										type="date"
										name="tanggal"
										id={'tanggal-' + sidangData.id}
										class="border rounded-xl p-2 mb-2"
									/>
									<input
										type="time"
										name="jam"
										id={'jam-' + sidangData.id}
										class="border rounded-xl p-2"
									/>
									<button type="submit" class="bg-primary/80 text-white p-3 rounded-xl mt-2">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
