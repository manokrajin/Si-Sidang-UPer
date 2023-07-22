<script>

    import Swal from "sweetalert2";
	// @ts-ignore
	function onSubmit(event) {
		event.preventDefault(); // Prevent the default form submission

		// @ts-ignore
		const judul = document.getElementById('judul').value;
		// @ts-ignore
		const tipe = document.getElementById('tipe').value;
		// @ts-ignore
		const file = document.getElementById('file').files[0];

        

		// Perform further operations with the form data
		// For example, you can send it to an API or process it locally

		console.log('Judul:', judul);
		console.log('Tipe:', tipe);
		console.log('File:', file);

        // Clear the form data after successful submission
        // @ts-ignore
        document.getElementById('judul').value = '';
        // @ts-ignore
        document.getElementById('tipe').value = '';
        // @ts-ignore
        document.getElementById('file').value = '';

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File berhasil diupload',
            showConfirmButton: false,
            timer: 1500
        })

        

	}
</script>

<div class="border m-10 rounded-xl border-primary">
	<div class="title p-5 bg-primary rounded-t-lg text-white">Upload Dokumen</div>
	<div class="content p-5">
		<form on:submit|preventDefault={onSubmit}>
			<div class="form-group">
				<label for="judul">Judul&ensp;: </label>
				<input
					type="text"
					id="judul"
					class="border rounded-lg border-primary"
					placeholder="Nama File"
				/>
			</div>
			<div class="form-group">
				<label for="tipe">Tipe&ensp;: </label>
				<select id="tipe" class="border rounded-lg border-primary">
					<option value="proposal">Proposal</option>
					<option value="laporan">Laporan</option>
					<option value="syarat">Dokumen Syarat</option>
				</select>
			</div>
			<div class="form-group">
				<label for="file">File&ensp;:</label>
				<input type="file" id="file" class="border rounded-lg border-primary cursor-pointer" />
			</div>
			<div class="form-group">
				<button class="p-2 bg-primary rounded-lg text-white hover:bg-primary/80">Upload</button>
			</div>
			<form />
		</form>
	</div>
</div>

<style>
	.form-group {
		margin-bottom: 10px;
	}
</style>
