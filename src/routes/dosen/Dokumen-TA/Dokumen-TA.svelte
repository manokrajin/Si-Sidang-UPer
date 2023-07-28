<script>
	import getAllSidang from "../../service/landingPage";
	import { userStore } from "../../login/loginStore";
	import { onMount } from "svelte";
	import { sidangStore } from "../service/sidangDosenStore";
	import { goto } from "$app/navigation";
	
	let data = [
		{
			id: 1,
			nama: 'mahran',
			judul: 'judul1',
			status: 'siap mengikuti sidang'
		},
		{
			id: 2,
			nama: 'mahran2',
			judul: 'judul2',
			status: 'belum mengikuti sidang'
		},
		{
			id: 3,
			nama: 'mahran3',
			judul: 'judul3',
			status: 'siap mengikuti sidang'
		}
	];

	let isLoggedIn = false;
	const unsubscribe = userStore.subscribe((user) => {
		isLoggedIn = user.isLogin;
	});
	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			if (isLoggedIn && $userStore.user.role == 'dosen ') {
				await getAllSidang().then((res) => {
					sidangStore.set(res);
					console.log($sidangStore, 'ini aku');
				});
			} else {
				// If the user is not logged in, redirect them to the login page
				goto('/dosen'); // Replace '/login' with the path to your login page
			}
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	});

	let searchQuery = '';

	let filteredData = [];

	$: {
		if (searchQuery.trim() === '') {
			filteredData = data;
		} else {
			filteredData = data.filter(
				(item) =>
					item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.status.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}
</script>

<div class="feedback">
	<div class="">
		<div class="title flex justify-center text-2xl my-10 text-primary">
			Dokument Tugas Akhir Mahasiswa
		</div>
	</div>
	<div class="tableData flex justify-center flex-col m-10 ">
		<div class="searchBar flex justify-center mb-4">
			<input
				type="text"
				bind:value="{searchQuery}"
				placeholder="Search by Name, Title, or Status"
				class="searchInput p-2 text-sm border-2 rounded-xl w-1/2"
			/>
		</div>

		{#each filteredData as item}
			<a href={`/dataMahasiswa/${item.id}`} class="cardTugasAkhir  border-b-2 border-gray my-5 mx-10 p-5 text-xl">
				<div class="content flex justify-evenly p-5 w-full">
					<div class="nama w-4/12 px-10">
						<div class="nama text-primary">Nama :</div>
						<div class="text-xxl">{item.nama}</div>
					</div>
					<div class="judul w-4/12"> 
						<div class="text-primary">Judul :</div>
						<div class="text-xl">{item.judul}</div>
					</div>
					<div class="status px-5 whitespace-nowrap w-2/12">
						<div class="text-primary">Status :</div>
						<div class="text-xl">{item.status}</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	td {
		padding: 1rem;
	}
</style>
