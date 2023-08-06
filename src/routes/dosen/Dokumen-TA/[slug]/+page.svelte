<script>
	// @ts-nocheck

	import { stringify } from 'postcss';
	import { getDokumenTADetail } from '../../../service/tugasAkhir';
	import { getDosenFile } from '../../../service/storage';
	import { getDosen } from '../../../service/firestore';
	import { onMount } from 'svelte';
	// @ts-nocheck
	export let data;

	let file = [];
	onMount(() => {
		getDokumenTADetail(data.slug).then((res) => {
			getDosenFile(res.mahasiswa).then((res) => {
				file = [...res];
			});
		});
	});
</script>

{#await getDokumenTADetail(data.slug)}
	<div>loading</div>
{:then dataDokumen}
	<div class="DokumenDetail">
		<!-- <div class="w-full">
			<pre class="break-words" id="json">{JSON.stringify({ data: dataDokumen }, undefined, 2)} </pre>
		</div> -->
		<div class="">
			<div class="title flex justify-center text-2xl my-10 text-primary">
				Dokument Tugas Akhir Mahasiswa
				{dataDokumen.mahasiswa}
			</div>
		</div>
		<div class="section flex justify-between">
			<div class="left w-1/2">
				<div class="nama p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Nama :</div>
					<div class="text-lg ">{dataDokumen.mahasiswa}</div>
				</div>
				<div class="judul p-5 m-5 border-b-2 flex justify-between border-gray/50">
					<div class="left">
						<div class="text-lg">Judul :</div>
						<div class="text-lg ">{dataDokumen.judul}</div>
					</div>
					<div class="right">
						<a href="/dosen/Dokumen-TA/${dataDokumen.id}/feedback/{dataDokumen.id}">
							<button>
								<div
									class="text-lg border-2 border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition duration-300 my-5"
								>
									Feedback
								</div>
							</button>
						</a>
					</div>
				</div>
				{#if dataDokumen.dosenPembimbing1}
					<div class="dosenPembimbing p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Pembimbing 1:</div>
						<div class="text-lg ">{dataDokumen.dosenPembimbing1}</div>
					</div>
				{/if}
				{#if dataDokumen.dosenPembimbing2 != '-'}
					<div class="dosenPembimbing2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Pembimbing 2 :</div>
						<div class="text-lg ">{dataDokumen.dosenPembimbing2}</div>
					</div>
				{/if}
				{#if dataDokumen.dosenPenguji1}
					<div class="dosenPenguji p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 1:</div>
						<div class="text-lg ">{dataDokumen.dosenPenguji1}</div>
					</div>
				{/if}
				{#if dataDokumen.dosenPenguji2}
					<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 2 :</div>
						<div class="text-lg ">{dataDokumen.dosenPenguji2}</div>
					</div>
				{/if}
				{#if dataDokumen.dosenPenguji3 != '-' && dataDokumen.dosenPenguji3}
					<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 3 :</div>
						<div class="text-lg ">{dataDokumen.dosenPenguji3}</div>
					</div>
				{/if}
			</div>
			<div class="right w-1/2 p-5">
				<div class="title text-lg p-5 text-gray">File yang telah dikumpulkan :</div>
				<div class="file px-5">
					{#each file as fileItem, i}
						<a href={fileItem.url} target="_blank" class="hover:text-primary"
							>{i + 1}. {fileItem.name}</a
						><br />
					{/each}
				</div>
			</div>
		</div>
	</div>
{/await}
