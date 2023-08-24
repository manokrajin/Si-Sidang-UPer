<script>
	import { onDestroy, onMount } from 'svelte';
	import { getDosen } from '../../service/firestore';
	import { updateJadwalDosen } from '../service/updateJadwalDosen';
	import { userStore } from '../../login/loginStore';
	import {getJadwalKosong, deleteJadwalKosong} from '../service/getJadwalKosong';


	let namaDosen = [];
	let jadwalKosong = [];
	let selectedDosen = '';
	let tanggal = '';
	let jamAwal = '';
	let jamAkhir = '';

	async function updateJadwal() {
		await updateJadwalDosen(selectedDosen, tanggal, jamAwal, jamAkhir);
        JadwalKosong($userStore.user.uid);
	}

	onDestroy(() => {
		namaDosen = [];
		selectedDosen = '';
		tanggal = '';
		jamAwal = '';
		jamAkhir = '';
	});

	getDosen();

	async function JadwalKosong(uid) {
		const res = await getJadwalKosong(uid);
		jadwalKosong = [...res];
	}

    function deleteItem(index) {
        jadwalKosong = [...jadwalKosong.slice(0, index), ...jadwalKosong.slice(index + 1)];
        deleteJadwalKosong($userStore.user.uid, jadwalKosong);
  }


	onMount(async () => {
		try {
			const res = await getDosen();
			namaDosen = [...res];
			JadwalKosong($userStore.user.uid);
		} catch (error) {
			console.error('Error fetching dosen data:', error);
		}
	});

</script>

<div class="jadwalKosong">
	<div class="title flex justify-center font-bold text-primary text-lg m-5">
		<h1>Tambah Jadwal Kosong</h1>
	</div>
	<div class="formContainer flex justify-center">
		<form on:submit|preventDefault={updateJadwal} class="">
			<div class="nama-input m-5">
				<div class="form-group">
					<label for="nama" class="text-primary">Nama Dosen</label>
				</div>
				<select
					bind:value={selectedDosen}
					id="nama"
					class="border rounded-lg border-primary p-2 pr-10 text-left"
				>
					<option value="" class="text-left">Select an option</option>

					<option value={$userStore.user.nama}>{$userStore.user.nama}</option>
				</select>
			</div>

			<div class="date-and-hour flex">
				<div class="form-group flex flex-col m-5">
					<label for="tanggal" class="text-primary">Tanggal</label>
					<input type="date" bind:value={tanggal} class="border rounded-lg border-primary p-2" />
				</div>
				<div class="form-group flex flex-col m-5">
					<label for="jam" class="text-primary">Jam Awal</label>
					<input type="time" bind:value={jamAwal} class="border rounded-lg border-primary p-2" />
				</div>
				<div class="form-group flex flex-col m-5">
					<label for="jam" class="text-primary">Jam Akhir</label>
					<input type="time" bind:value={jamAkhir} class="border rounded-lg border-primary p-2" />
				</div>
			</div>

			<div class="button flex justify-center m-5">
				<button type="submit" class="bg-primary text-white rounded-md p-2">Tambah</button>
			</div>
		</form>
	</div>

	<div class="jadwalKosongContainer border m-10 p-10 rounded-lg border-primary">
        <div class="title text-center font-bold">Jadwal Kosong Saya</div>
        <div class="jadwalKosong grid grid-cols-4 gap-4 w-6/12 m-auto my-4">
          {#each jadwalKosong as item, i}
            <div class="card border p-3 border-primary rounded-lg flex flex-col md:flex-row">
              <div class="w-full md:w-4/6">
                <div class="tanggal">
                  Tanggal: {item.tanggal}
                </div>
                <div class="jamAwal">
                  Jam Mulai: {item.jamAwal}
                </div>
                <div class="jamAkhir">
                  Jam Akhir: {item.jamAkhir}
                </div>
              </div>
              <div class="delete m-auto">
                <button class="bg-red-500 text-white px-4 py-2 rounded" on:click={() => deleteItem(i)}>
                  Delete
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
</div>
