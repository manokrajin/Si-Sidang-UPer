<script>
    import { onDestroy, onMount } from "svelte";
    import { getDosen } from "../../service/firestore";
    import { updateJadwalDosen } from "../service/updateJadwalDosen";
    import { userStore } from "../../login/loginStore";

    let namaDosen = [];
    let selectedDosen = "";
    let tanggal = "";
    let jamAwal = "";
    let jamAkhir = "";

    async function updateJadwal() {
        await updateJadwalDosen(selectedDosen, tanggal, jamAwal, jamAkhir);
    }

    onDestroy(() => {
        namaDosen = [];
        selectedDosen = "";
        tanggal = "";
        jamAwal = "";
        jamAkhir = "";
    });

    getDosen();

    onMount(async () => {
        try {
            const res = await getDosen();
            namaDosen = [...res];
        } catch (error) {
            console.log(error);
        }
    });
</script>

<div class="jadwalKosong">
    <div class="title flex justify-center font-bold text-primary text-lg m-5">
        <h1>Tambah Jadwal Kosong</h1>
    </div>

    <form on:submit|preventDefault={updateJadwal} class="">
        <div class="nama-input m-5">
            <div class="form-group">
                <label for="nama" class="text-primary">Nama Dosen</label>
            </div>
            <select bind:value={selectedDosen} id="nama" class="border rounded-lg border-primary p-1 pr-10 text-left">
                <option value="" class="text-left">Select an option</option>
        
                    <option value={$userStore.user.nama}>{$userStore.user.nama}</option>
            
            </select>
        </div>

        <div class="date-and-hour flex">
            <div class="form-group flex flex-col m-5">
                <label for="tanggal" class="text-primary">Tanggal</label>
                <input type="date" bind:value={tanggal} class="border rounded-lg border-primary p-1" />
            </div>
            <div class="form-group flex flex-col m-5">
                <label for="jam" class="text-primary">Jam Awal</label>
                <input type="time" bind:value={jamAwal} class="border rounded-lg border-primary p-1" />
            </div>
            <div class="form-group flex flex-col m-5">
                <label for="jam" class="text-primary">Jam Akhir</label>
                <input type="time" bind:value={jamAkhir} class="border rounded-lg border-primary p-1" />
            </div>
        </div>

        <div class="button flex justify-center m-5">
            <button type="submit" class="bg-primary text-white rounded-lg p-1">Tambah</button>
        </div>
    </form>
</div>
