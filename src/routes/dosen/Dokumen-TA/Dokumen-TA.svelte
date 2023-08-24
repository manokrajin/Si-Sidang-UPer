<script>
	import getAllSidang from "../../service/landingPage";
	import { userStore } from "../../login/loginStore";
	import { onMount } from "svelte";
	import { sidangStore } from "../service/sidangDosenStore";
	import { goto } from "$app/navigation";
	import NavbarLoginDosen from "../NavbarLoginDosen.svelte";

	let isLoggedIn = false;
	const unsubscribe = userStore.subscribe((user) => {
		isLoggedIn = user.isLogin;
	});
	onMount(async () => {
		// Fetch all sidang data when the component is mounted
		try {
			if (isLoggedIn && $userStore.user.role == 'dosen') {
				await getAllSidang().then((res) => {
					sidangStore.set(res);
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
		filteredData = $sidangStore.filter((data) => {
			const name = data.mahasiswa ? data.mahasiswa.toLowerCase() : '';
			const judul = data.judul ? data.judul.toLowerCase() : '';
			return name.includes(searchQuery.toLowerCase()) || judul.includes(searchQuery.toLowerCase());
		});
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

		{#each filteredData as item,i}
			
			<a href={`/dosen/Dokumen-TA/${item.id}`} class="cardTugasAkhir my-5 mx-10 p-5 text-xl rounded-xl bg-gray/30">
				
				<div class="content flex justify-evenly p-5 w-full">
					<div class="number">
						<div class="text-primary">No :</div>
						<div class="text-xl">{i + 1}.</div>
					</div>
					<div class="nama w-4/12 px-10">
						<div class="nama text-primary">Nama :</div>
						<div class="text-xxl">{item.mahasiswa}</div>
					</div>
					<div class="judul w-4/12"> 
						<div class="text-primary">Judul :</div>
						<div class="text-xl">{item.judul}</div>
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

    .cardTugasAkhir {
        margin: 5px 10px;
        padding: 5px;
        text-align: center;
        transition: transform 0.3s, background-color 0.3s; /* Add transitions for transform and background-color */
    }

    .cardTugasAkhir:hover {
        background-color: #f0f0f0; /* Change the background color on hover */
        transform: scale(1.01); /* Apply a scale transformation on hover to create a pop-up effect */
    }
    /* Other styles for your elements */

</style>
