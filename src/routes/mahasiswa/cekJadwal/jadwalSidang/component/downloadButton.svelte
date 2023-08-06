<script>
    import { downloadFile } from "../../../../service/storage";

    export let fileName;
    export let type;
</script>

<button class=" p-2 bg-primary text-white rounded-lg m-1"on:click={() => downloadFile(fileName, type)}>Unduh</button>
