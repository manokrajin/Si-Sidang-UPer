<script>
	import DeleteButton from './component/deleteButton.svelte';
	import DownloadButton from './component/downloadButton.svelte';
	import { getFile } from '../../../service/storage';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { data } from '../../service/sidangStore';
	import getSidang from '../../service/mahasiswa';

	// Define the async function to fetch the data
	

	

	// Call the async function to fetch and store the data
	// onMount(() => {
	// 	getFile().then((res) => {
	// 		data.update(() => res);
	// 	});
	// });

	$ : {
		getFile().then((res) => {
			data.update(() => res);
		});
	}

	




</script>

<body>
	<div class="pengumuman bg-red-alert/10 rounded-xl mx-10 p-5 mb-5">
		<div class="title">
			<div class="text-2xl font-bold text-primary p-1">Pengumuman</div>
		</div>
		<div class="content p-1 text-red-alert font-bold">
			Dokumen Tugas Akhir baik proposal maupun Tugas Akhir yang diupload merupakan dokumen yang
			telah direvisi dan akan diajukan!
		</div>
	</div>

	<div class="uploadSection mx-10 rounded-xl flex justify-center">
		<div class="table">
			<tr>
				<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No</th>
				<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Judul</th>
				<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tipe</th>

				<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File</th>
				<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Aksi</th>
			</tr>
			{#if $data == null}
				<tr>
					<td colspan="5" class="text-center">Tidak ada file</td>
				</tr>
			{:else}
				{#each $data as item, i}
					<tr>
						<td>{i + 1}</td>
						<td>{item.name}</td>
						<td>{item.type}</td>
						<td><a href={item.url}>klik disini</a></td>
						<td class="text-center"><DeleteButton /> <DownloadButton /></td>
					</tr>
				{/each}
			{/if}
		</div>
	</div>
	<div class="uploadFile mx-10">
		<a
			class="p-2 bg-primary rounded-lg text-white"
			href="/mahasiswa/cekJadwal/jadwalSidang/uploadFile"
		>
			<span>Upload File</span>
		</a>
	</div>
</body>

<style>
	th {
		padding: 5px;
	}

	td:first-child {
		width: 5%;
		text-align: center;
	}

	td {
		padding: 5px;
		width: min-content;
	}
	.table {
		width: 80%;
	}

	.uploadFile a {
		width: min-content;
		white-space: nowrap;
	}

	.uploadFile {
		display: flex;
		justify-content: flex-end;
	}
</style>
