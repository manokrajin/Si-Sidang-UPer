<script>
	let data = {
		nama: 'Mahran Radifan Zhafir',
		judul: 'Judul',
		status: 'Siap mengikuti TA',
		dosenPembimbing: 'Dosen Pembimbing',
		dosenPembimbing2: 'Dosen Pembimbing 2',
		dosenPenguji: 'Dosen Penguji',
		dosenPenguji2: 'Dosen Penguji 2'
	};
</script>

<div class="feedback">
	<div class="">
		<div class="title flex justify-center text-2xl my-10 text-primary">
			Beri Feedback
		</div>
	</div>
	<div class="section flex justify-between">
		<div class="left w-1/2">
			<div class="nama p-5 m-5 border-b-2 border-gray/50">
				<div class="text-lg">Nama :</div>
				<div class="text-lg text-primary">{data.nama}</div>
			</div>
			<div class="judul p-5 m-5 border-b-2 flex justify-between border-gray/50">
				<div class="left">
					<div class="text-lg">Judul :</div>
					<div class="text-lg text-primary">{data.judul}</div>
				</div>
			</div>
			<div class="status p-5 m-5 border-b-2 border-gray/50">
				<div class="text-lg">Status :</div>
				<div class="text-lg text-primary">{data.status}</div>
			</div>
			{#if data.dosenPembimbing}
				<div class="dosenPembimbing p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Dosen Pembimbing 1:</div>
					<div class="text-lg text-primary">{data.dosenPembimbing}</div>
				</div>
			{/if}
			{#if data.dosenPembimbing2}
				<div class="dosenPembimbing2 p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Dosen Pembimbing 2 :</div>
					<div class="text-lg text-primary">{data.dosenPembimbing2}</div>
				</div>
			{/if}
			{#if data.dosenPenguji}
				<div class="dosenPenguji p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Dosen Penguji 1:</div>
					<div class="text-lg text-primary">{data.dosenPenguji}</div>
				</div>
			{/if}
			{#if data.dosenPenguji2}
				<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Dosen Penguji 2 :</div>
					<div class="text-lg text-primary">{data.dosenPenguji2}</div>
				</div>
			{/if}
			{#if data.dosenPenguji3}
				<div class="dosenPenguji2 p-5 m-5 border-b-2 border-gray/50">
					<div class="text-lg">Dosen Penguji 3 :</div>
					<div class="text-lg text-primary">{data.dosenPenguji3}</div>
				</div>
			{/if}
		</div>
		<div class="right w-1/2">
			<div class="feedback p-5 m-5 border-b-2 border-gray/50">
				<div class=" text-primary my-5">Beri komentar dan feedback :</div>
				<textarea class="text-primary w-full h-96 border-2 border-primary/70 rounded-lg p-1"></textarea>
			</div>
			<div class="button flex justify-end m-10">
				<button class="bg-primary text-white rounded-lg p-3">Simpan</button>
			</div>
		</div>
		
	</div>
</div>
