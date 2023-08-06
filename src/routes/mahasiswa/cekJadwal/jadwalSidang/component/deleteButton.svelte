<script>
    import { deleteFile } from "../../../../service/storage";

    export let fileName;
    export let type;

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus file ini?')) {
            deleteFile(fileName, type);
        }
    };
</script>

<button class="p-2 rounded-lg bg-red-alert text-white m-1" on:click={handleDelete}>Hapus</button>
