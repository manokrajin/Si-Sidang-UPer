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
					
				</div>
			</div>
		</div>
	</a>
</div>

<style>
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* Efek transisi untuk perubahan transform dan box-shadow */
    }

    .card:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }

    .card:not(:hover) {
        transform: scale(1); /* Kembalikan skala saat tidak dihover */
        box-shadow: none; /* Hapus bayangan saat tidak dihover */
    }
</style>
