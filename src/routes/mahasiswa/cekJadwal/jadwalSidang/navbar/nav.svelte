<script type="module">
    //ini punya slider mahasiswa
	import Jadwal from '../jadwal.svelte';
	import UploadTable from '../uploadTable.svelte';

	const navOption = [
		{
			page: 'Jadwal',
			component: Jadwal
		},
		{
			page: 'Upload',
			component: UploadTable
		}
	];

    export { navOption };
</script>

