<script>
	import Papa from 'papaparse';
	import registerDosen from '../../service/registerDosen';
	import { EmailAuthCredential } from 'firebase/auth';
	import { logoutUser } from '../../service/loginAdmin';
	import { goto } from '$app/navigation';
	import getAllSidang from '../service/getAllSidang';
	import { onMount } from 'svelte';
	import { sidangStore } from '../../mahasiswa/service/sidangStore';

	// Your Firebase configuration

	// Initialize Firebase

	let csvData = '';
	let jsonData = [];
	let sidangData = [];

	let searchTerm = '';
	let filteredSidangStore = $sidangStore;

	function handleSearch(event) {
		searchTerm = event.target.value.toLowerCase();
		if (searchTerm.trim() === '') {
			// If the search term is empty, display all sidangStore data
			filteredSidangStore = $sidangStore;
		} else {
			// Filter the sidangStore based on the search term
			filteredSidangStore = $sidangStore.filter((sidangData) =>
				JSON.stringify(sidangData).toLowerCase().includes(searchTerm)
			);
		}
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
			const { email, password, nama } = dosenData;
			try {
				await registerDosen(email, password, nama);
				jsonData = [];
			} catch (error) {
				console.log(error);
			}
		}
	}

	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			await getAllSidang().then((res) => {
				sidangStore.set(res);
				console.log($sidangStore, 'ini aku');
			});
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	});

	function logout() {
		logoutUser().then(() => {
			goto('/admin');
		});
	}
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

	<div class="listSidang m-10 rounded-xl bg-white">
		<div class="title text-center font-bold text-3xl m-10">
			<h1>List Sidang</h1>
		</div>
		<input
			type="text"
			placeholder="Search..."
			class="mb-4 p-2 rounded"
			bind:value={searchTerm}
			on:input={handleSearch}
		/>
		{#if $sidangStore}
			{#if filteredSidangStore.length > 0}
				{#each $sidangStore as sidangData}
					<div class="cards rounded-xl m-3">
						<div class="title bg-primary text-white p-2 rounded-t-xl">
							<div class="judul capiitalize text-2xl">{sidangData.judul}</div>
						</div>
						<div class="content flex p-2">
							<div class="left w-1/2">
								Nama Mahasiswa : {sidangData.mahasiswa} <br />
								Dosen Pembimbing : {sidangData.dosenPembimbing} <br />
								Dosen Pembimbing 2 : {sidangData.dosenPembimbing2} <br />
								Dosen Penguji : {sidangData.dosenPenguji1} <br />
								Dosen Penguji 2 : {sidangData.dosenPenguji2} <br />
								Dosen Penguji 3 : {sidangData.dosenPenguji3} <br />
							</div>
							<div class="right w-1/2">
								<button class="bg-primary/80 text-white p-3 rounded-xl"> automasi jadwal </button>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<p>no match</p>
			{/if}
		{:else}
			no data yet
		{/if}
	</div>
</main>
