<script>
	import { userStore } from "../../../login/loginStore";
	import { data } from "../../service/sidangStore";
	import { onMount } from "svelte";
	let nim = '0000000000';

	import getSidang from "../../service/mahasiswa";
	
	let judul;
	let tanggalSidang;
	let jamSidang;
	let dosenPembimbing1;
	let dosenPembimbing2;
	let dosenPenguji;
	let dosenPenguji2;
	let dosenPenguji3;
	


	onMount(() => {
		getSidang().then((res) => {
		let dataSidang = {};
		
		dataSidang = res;
		console.log(dataSidang);
		judul = dataSidang[0].judul;
		tanggalSidang = dataSidang[0].tanggal;
		jamSidang = dataSidang[0].waktu;
		dosenPembimbing1 = dataSidang[0].dosenPembimbing1;
		dosenPembimbing2 = dataSidang[0].dosenPembimbing2;
		dosenPenguji = dataSidang[0].dosenPenguji1;
		dosenPenguji2 = dataSidang[0].dosenPenguji2;
		dosenPenguji3 = dataSidang[0].dosenPenguji3;
	
	
	});
	});

	
</script>



<div class="jadwalSidang flex justify-center">
	<table class="table table-auto border-separate border-spacing-y-2 rounded-xl w-9/12 p-3">
		<tbody>
			<tr>
				<td>Nama</td>
				<td>: {$userStore.user.nama}</td>
			</tr>
			<tr>
				<td>NIM</td>
				<td>: {$userStore.user.nim}</td>
			</tr>
			<tr>
				<td>Judul</td>
				<td>: {judul}</td>
			</tr>
			<tr>
				<td>Tanggal Sidang</td>
				<td>: {tanggalSidang}</td>
			</tr>
			<tr>
				<td>Jam Sidang</td>
				<td>: {jamSidang}</td>
			</tr>
			<tr>
				<td>Dosen Pembimbing 1</td>
				<td>: {dosenPembimbing1}</td>
			</tr>
			{#if dosenPembimbing2}
			<tr>
				<td>Dosen Pembimbing 2</td>
				<td>: {dosenPembimbing2}</td>
			</tr>
			{/if}
			
			<tr>
				<td>Dosen Penguji 1</td>
				<td>: {dosenPenguji}</td>
			</tr>
			<tr>
				<td>Dosen Penguji 2</td>
				<td>: {dosenPenguji2}</td>
			</tr>
			{#if dosenPenguji3}
			<tr>
				<td>Dosen Penguji 3</td>
				<td>: {dosenPenguji3}</td>
			</tr>
			{/if}
			
		</tbody>
	</table>
</div>

<style>
    .table {
        background-color: gainsboro;
        
        
    }
</style>