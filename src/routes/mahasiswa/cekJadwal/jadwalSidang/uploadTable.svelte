<script>
    import DeleteButton from "./component/deleteButton.svelte";
    import DownloadButton from "./component/downloadButton.svelte";
    let data = [
        {judul : 'judul1', tipe : 'proposal', status : 'aktif', file : 'file1.pdf'},
        {judul : 'judul2', tipe : 'proposal', status : 'aktif', file : 'file2.pdf'},
        {judul : 'judul3', tipe : 'proposal', status : 'aktif', file : 'file3.pdf'},
    ]
</script>
<body>
    <div class="pengumuman bg-red-alert/10 rounded-xl mx-10 p-5 mb-5">
        <div class="title">
            <div class="text-2xl font-bold text-primary p-1">Pengumuman</div>
        </div>
        <div class="content p-1 text-red-alert font-bold">
            Dokumen Tugas Akhir baik proposal maupun Tugas Akhir yang diupload merupakan dokumen yang telah direvisi dan akan diajukan!
        </div>
    </div>

    <div class="uploadSection mx-10 rounded-xl flex justify-center ">
        <div class="table">
            <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Judul</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tipe</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Aksi</th>
            </tr>
            {#each data as item, i}
                <tr>
                    <td>{i+1}</td>
                    <td>{item.judul}</td>
                    <td>{item.tipe}</td>
                    <td>{item.status}</td>
                    <td>{item.file}</td>
                    <td class="text-center"><DeleteButton/> <DownloadButton/></td>
                </tr>
            {/each}
          
            
        </div>
        
    </div>
    <div class="uploadFile mx-10">
        <a class="p-2 bg-primary rounded-lg text-white" href="">
         <span>Upload File</span>
        </a>
     </div>
    
</body>

<style>
    th{
        padding: 5px;
    }

    td:first-child{
        width: 5%;
        text-align: center;
    }

    td{
        padding : 5px;
        width: min-content;
    }
    .table{
        width: 80%;
    }
   
    .uploadFile a{
        width: min-content;
        white-space: nowrap;
    }

    .uploadFile{
        display: flex;
        justify-content: flex-end;
    }
</style>