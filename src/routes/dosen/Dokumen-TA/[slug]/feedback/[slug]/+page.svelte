<script>
	import { getDokumenTADetail } from '../../../../../service/tugasAkhir.js';
	import { onMount } from 'svelte';
	import { updateFeedback } from '../../../../service/updateFeedback.js';
	import Swal from 'sweetalert2';
	export let data;
	

	let selectedDosen = '';
	let feedbackDosen = '';

	function submitHandler() {
        if (selectedDosen.trim() === "" || feedbackDosen.trim() === "") {
            Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Isi semua field!',
				timer: 1000,
			});
            return; // Prevent form submission if required fields are empty
        }

        updateFeedback(data.slug, selectedDosen, feedbackDosen).then((res) => {
            console.log(res);
        });
    }

	let dosen = [];
	onMount(async () => {
        await getDokumenTADetail(data.slug).then((res) => {
            if (res.dosenPembimbing1 && res.dosenPembimbing1 !== "-") {
                dosen = [...dosen, { nama: res.dosenPembimbing1 }];
            }
            if (res.dosenPembimbing2 && res.dosenPembimbing2 !== "-") {
                dosen = [...dosen, { nama: res.dosenPembimbing2 }];
            }
            if (res.dosenPenguji1 && res.dosenPenguji1 !== "-") {
                dosen = [...dosen, { nama: res.dosenPenguji1 }];
            }
            if (res.dosenPenguji2 && res.dosenPenguji2 !== "-") {
                dosen = [...dosen, { nama: res.dosenPenguji2 }];
            }
            if (res.dosenPenguji3 && res.dosenPenguji3 !== "-") {
                dosen = [...dosen, { nama: res.dosenPenguji3 }];
            }
			console.log(dosen);
        });
    });

	getDokumenTADetail(data.slug).then((res) => {
		console.log(res);
	});


</script>

{#await getDokumenTADetail(data.slug)}
	<p>loading...</p>
{:then dataDokumen}
	<!-- <div class="w-full ">
			<pre class="break-words" id="json">{JSON.stringify({ data: dataDokumen }, undefined, 2)} </pre>
		</div> -->
	<div class="content w-full bg-gray/10 h-screen">
		<div class="title text-primary text-center text-2xl p-10">Beri Feedback</div>
		<div class="formFeedback bg-white rounded-xl m-10 p-10 h-min-xl">
			<form action="" on:submit|preventDefault={submitHandler}>
				<label for="inputDosen">Nama Dosen :</label> <br />
				<select name="" id=""  bind:value={selectedDosen} class="border rounded-lg p-2 my-2 border-primary">
					<option value="" disabled selected>Pilih nama dosen</option>
					{#each dosen as dosen}
						<option value={dosen.nama}>{dosen.nama}</option>
					{/each}
				</select> <br />
				<label for="feedbackDosen">Feedback : </label><br />
				<textarea bind:value={feedbackDosen} name="" id="" class="w-full p-2 border border-primary rounded-lg my-2" />
				<button type="submit" class="bg-primary text-white rounded-lg p-2">Submit</button>
			</form>
		</div>
	</div>
{/await}
