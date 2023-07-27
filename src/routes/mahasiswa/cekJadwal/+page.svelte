<script>
	import DynamicNavbar from '../../DynamicNavbar.svelte';
    import { judul, status } from '../service/sidangStore';
	import getSidang from '../service/mahasiswa';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';

    onMount(() => {
        fetchData();
    });
	async function fetchData() {
		try {
			const res = await getSidang();
			judul.update(() => res[0].judul);
            status.update(() => res[0].status);
         
		} catch (error) {
			// Handle any errors that may occur during the fetching process
			console.error('Error fetching data:', error);
		}
	}

	// Call the async function
	fetchData();

  
	
</script>

<div class="">
	<DynamicNavbar />
	<div class="title flex justify-center text-2xl my-10">Sidang Aktif</div>
	<a href="/mahasiswa/cekJadwal/jadwalSidang">
		<div class="card rounded-2xl mx-10 shadow-md hover:shadow-lg font-bold">
			<div class="title bg-primary/90 text-white rounded-t-2xl p-5">
				<div class="text-2xl">Tugas Akhir</div>
			</div>
			<div class="content flex justify-between p-5">
				<div class="judul w-1/2">
					<div class="text-lg">{$judul}</div>
				</div>
				<div class="status px-5">
					<div class="text-sm">Status : {$status}</div>
				</div>
			</div>
		</div>
	</a>
</div>
