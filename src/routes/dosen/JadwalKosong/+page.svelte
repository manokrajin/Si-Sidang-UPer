<script>
	import { onMount } from "svelte";

	let namaDosen = [
		{
			nama: 'nama1'
		},
		{
			nama: 'nama2'
		},
		{
			nama: 'nama3'
		}
	];

	
    onMount(() => {
        const selectDosen = document.getElementById('nama');
        namaDosen.forEach((dosen) => {
		const option = document.createElement('option');
		option.value = dosen.nama; // The value that will be sent to the server on form submission
		option.text = dosen.nama; // The visible text in the dropdown
		selectDosen.appendChild(option);
	});
    })
	// Create and add options based on the data

</script>

<div class="jadwalKosong">
	<div class="title flex justify-center font-bold text-primary text-lg m-5">
		<h1>Tambah Jadwal Kosong</h1>
	</div>

	<form action="" class = "">
        <div class="nama-input m-5">
            <div class="form-group">
                <label for="nama" class="text-primary">Nama Dosen</label>
            </div>
            <select name="nama" id="nama" class="border rounded-lg border-primary p-1 pr-10 text-left">
                <option value="" class="text-left">Select an option</option>
            </select>
        </div>
		

        <div class="date-and-hour flex">
            <div class="form-group flex flex-col m-5">
                <label for="tanggal" class="text-primary">Tanggal</label>
                <input type="date" id="tanggal" class="border rounded-lg border-primary p-1" />
            </div>
            <div class="form-group flex flex-col m-5">
                <label for="jam" class="text-primary">Jam</label>
                <input type="time" id="jam" class="border rounded-lg border-primary p-1" />
            </div>
        </div>
        
	</form>
</div>
