<script>
	import { stringify } from 'postcss';
	import { getDokumenTADetail } from '../../../service/tugasAkhir';

	// @ts-nocheck
	export let data;
	let dataUser = {
		nama: 'Mahran Radifan Zhafir',
		judul: 'Judul',
		status: 'Siap mengikuti TA',
		dosenPembimbing: 'Dosen Pembimbing',
		dosenPembimbing2: 'Dosen Pembimbing 2',
		dosenPenguji: 'Dosen Penguji',
		dosenPenguji2: 'Dosen Penguji 2',
		file1: 'file1.pdf',
		file2: 'file2.pdf',
		file3: 'file3.pdf'
	};
</script>

{#await getDokumenTADetail(data.slug)}
	<div>loading</div>
{:then dataDokumen}
	<div class="DokumenDetail">
		<div class="w-full">
			<pre class="break-words" id="json">{JSON.stringify({ data: dataDokumen }, undefined, 2)}</pre>
		</div>
		<div class="">
			<div class="title flex justify-center text-2xl my-10 text-primary">
				Dokument Tugas Akhir Mahasiswa
			</div>
		</div>
		<div class="section flex justify-between">
			<div class="left w-1/2">
				<div class="nama p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Nama :</div>
					<div class="text-lg text-primary">{dataUser.nama}</div>
				</div>
				<div class="judul p-5 m-5 border-b-2 flex justify-between border-gray/50">
					<div class="left">
						<div class="text-lg">Judul :</div>
						<div class="text-lg text-primary">{dataUser.judul}</div>
					</div>
					<div class="right">
						<a href="">
							<button>
								<div
									class="text-lg border-2 border-primary rounded-xl p-2 hover:bg-primary hover:text-white transition duration-300"
								>
									Feedback
								</div>
							</button>
						</a>
					</div>
				</div>
				<div class="status p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Status :</div>
					<div class="text-lg text-primary">{dataUser.status}</div>
				</div>
				{#if dataUser.dosenPembimbing}
					<div class="dosenPembimbing p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Pembimbing 1:</div>
						<div class="text-lg text-primary">{dataUser.dosenPembimbing}</div>
					</div>
				{/if}
				{#if dataUser.dosenPembimbing2}
					<div class="dosenPembimbing2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Pembimbing 2 :</div>
						<div class="text-lg text-primary">{dataUser.dosenPembimbing2}</div>
					</div>
				{/if}
				{#if dataUser.dosenPenguji}
					<div class="dosenPenguji p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 1:</div>
						<div class="text-lg text-primary">{dataUser.dosenPenguji}</div>
					</div>
				{/if}
				{#if dataUser.dosenPenguji2}
					<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 2 :</div>
						<div class="text-lg text-primary">{dataUser.dosenPenguji2}</div>
					</div>
				{/if}
				{#if dataUser.dosenPenguji3}
					<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
						<div class="text-lg">Dosen Penguji 3 :</div>
						<div class="text-lg text-primary">{dataUser.dosenPenguji3}</div>
					</div>
				{/if}
			</div>
			<div class="right w-1/2 p-5">
				<div class="title text-lg p-5 text-gray">File yang telah dikumpulkan :</div>
				<div class="file px-5">
					{#each Object.entries(data) as [key, value]}
						{#if key.startsWith('file')}
							<div class={key}>
								<div class="text-lg text-primary">{value}</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
{/await}
