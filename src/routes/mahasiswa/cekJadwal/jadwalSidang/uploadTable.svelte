<script>
	import DeleteButton from './component/deleteButton.svelte';
	import DownloadButton from './component/downloadButton.svelte';
	import { getFile, deleteFile } from '../../../service/storage';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { data } from '../../service/sidangStore';
	import getSidang from '../../service/mahasiswa';

	// Define the async function to fetch the data

	let isHovered = false;

	function handleHover() {
		isHovered = !isHovered;
	}

	let isLoading = true;
	// Call the async function to fetch and store the data
	// onMount(() => {
	// 	getFile().then((res) => {
	// 		data.update(() => res);
	// 	});
	// });

	$: {
		getFile().then((res) => {
			data.update(() => res);
			isLoading = false;
		});
	}
</script>

<div>
	<div class="pengumuman bg-gray/20 rounded-xl mx-10 p-5 mb-5">
		<div class="title">
			<div class="text-2xl font-bold text-primary p-1">Pengumuman</div>
		</div>
		<div class="content p-1 font-bold">
			Dokumen Tugas Akhir baik proposal maupun Tugas Akhir yang diupload merupakan dokumen yang
			telah direvisi dan akan diajukan!
		</div>
	</div>

	<div class="uploadSection rounded-xl flex justify-center flex-row w-full">
		<div class="table  p-10">
			<table>
				{#if isLoading}
					<tr>
						<td colspan="4" class="loading-container">
							<img class="loading-spinner" src="/path/to/loading-spinner.gif" alt="Loading..." />
							Loading...
						</td>
					</tr>
				{:else if $data == null || $data.length === 0}
					<tr>
						<td colspan="5" class="text-center">Belum ada file yang diupdate</td>
					</tr>
				{:else}
					<tr>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Judul</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tipe</th>

						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Aksi</th>
					</tr>
					{#each $data as item, i}
						<tr>
							<td>{i + 1}.</td>
							<td>{item.name}</td>
							<td>{item.type}</td>
							<td class="text-center">
								<DeleteButton fileName={item.name} type={item.type} />
								<DownloadButton fileName={item.name} type={item.type} />
							</td>
						</tr>
					{/each}
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>
							
						</td>
						
					</tr>
				{/if}
				
			</table>
			<div class="uploadFile m-auto">
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<a
					class="p-2 bg-primary rounded-lg text-white m-auto my-5"
					href="/mahasiswa/cekJadwal/jadwalSidang/uploadFile"
					on:mouseover={handleHover}
					on:mouseout={handleHover}
					class:active={isHovered}
				>
					<span>Upload File</span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	th {
		padding: 5px;
	}

	td:first-child {
		width: 5%;
		text-align: center;
	}



	.uploadFile a {
		width: min-content;
		white-space: nowrap;
	}

	.uploadFile {
		display: flex;
		justify-content: flex-end;
	}

	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.uploadFile a.active {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		transform: scale(1.1); /* Ubah faktor skala sesuai kebutuhan */
	}

	.uploadFile a:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
</style>
