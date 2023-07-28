<script>
	import { get } from "svelte/store";
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1; // JavaScript months start at 0

	if (month < 8) {
		// @ts-ignore
		year = `${year - 1}/${year}`;
	} else {
		year = `${year}/${year + 1}`;
	}

	//nanti masukin data dari API untuk data jadwal
	let data = [
		{ col1: 'A1', col2: 'B1', col3: 'C1', col4: 'D1', col5: 'E1' },
		{ col1: 'A2', col2: 'B2', col3: 'C2', col4: 'D2', col5: 'E2' }
		// Add as many rows as you want
		// ..
	];
	let search = '';
	let filteredData = [];

	
	import DynamicNavbar from "./DynamicNavbar.svelte";
	import {getMahasiswa} from "./service/firestore";


	getMahasiswa().then((res) => {
		console.log(res);
	});

	import getAllSidang from "./service/landingPage";
	import { onMount } from "svelte";
	import { sidangStore } from "./mahasiswa/service/sidangStore";
	onMount(async () => {
		try{
			await getAllSidang().then((res) => {
				sidangStore.set(res);
				console.log($sidangStore, 'ini aku');
			});
		} catch (error) {
			console.error('Error fetching sidang data:', error);
		}
	})
	$: {
		filteredData = $sidangStore.filter((data) => {
			const name = data.mahasiswa ? data.mahasiswa.toLowerCase() : '';
			const judul = data.judul ? data.judul.toLowerCase() : '';
			return name.includes(search.toLowerCase()) || judul.includes(search.toLowerCase());
		});
	}
	
	
	
</script>

<DynamicNavbar />
<header class="flex justify-between p-10 py-5 bg-gray/10">
	<h1 class="py-3">Daftar Sidang {year}</h1>
	<div>
		<div class="pt-2 relative mx-auto text-gray-600 py-3">
			<input
				class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
				type="search"
				name="search"
				placeholder="Search"
				bind:value={search}
			/>
			<button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
				<svg
					class="text-gray-600 h-4 w-4 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					id="Capa_1"
					x="0px"
					y="0px"
					viewBox="0 0 56.966 56.966"
					style="enable-background:new 0 0 56.966 56.966;"
					xml:space="preserve"
					width="512px"
					height="512px"
				>
					<path
						d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<body class="bg-gray/10">
	<div class="jadwalTable flex items-stretch justify-center">
		<table class="w-4/5 border-spacing-y-5 border-separate rounded-xl">
			<thead>
				<tr>
					<th>Judul</th>
					<th>Mahasiswa</th>
					<th>Pembimbing</th>
					<th>Penguji</th>
					<th>Jadwal Sidang</th>
				</tr>
			</thead>
			<tbody class="">
				{#each filteredData as data (data)}
					<tr class=" border mb-3 bg-white rounded-xl py-5">
						<td class="py-10 rounded-l-xl pl-2"><p class= "whitespace-wrap max-w-xs break-all">{data.judul}saodn;jskpajnaskodka;jskldsakmdsdskjofnllsmd;m </p></td>
						<td>{data.mahasiswa}</td>
						<td>
							Dosen Pembimbing 1 : <br>{data.dosenPembimbing} <br>
							Dosen Pembimbing 2 : <br>{data.dosenPembimbing2}
						</td>
						<td>
							Dosen Penguji 1 : <br>{data.dosenPenguji1} <br>
							Dosen Penguji 2 : <br>{data.dosenPenguji2} <br>
							{#if data.dosenPenguji3}
								Dosen Penguji 3 : <br>{data.dosenPenguji3}
							{/if}
						</td>
						<td class="rounded-r-xl pr-2">{data.col5}</td>
					</tr>	
				{/each}
			</tbody>
		</table>
	</div>
</body>
