<script>
    import UploadTable from './uploadTable.svelte';
    import Jadwal from './jadwal.svelte';
    import DynamicNavbar from '../../../DynamicNavbar.svelte';
    import Feedback from './feedback/feedback.svelte';

    let activePage = 'dataTugasAkhir';

    function setActivePage(page) {
        activePage = page;
    }
</script>

<section>
    <div class="title w-full flex justify-center my-10 font-bold text-primary/90 text-xl">
        Data Tugas Akhir
    </div>   
    <div class="navbar flex justify-center m-10 " >
        <div class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer " class:active={activePage === 'dataTugasAkhir'} on:click={() => setActivePage('dataTugasAkhir')}>
            Data Tugas Akhir
        </div>
        <div class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer" class:active={activePage === 'jadwalSidang'} on:click={() => setActivePage('jadwalSidang')}>
            Jadwal Sidang
        </div>
        <div class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer" class:active={activePage === 'feedback'} on:click={() => setActivePage('feedback')}>
            Feedback
        </div>
    </div>
    <div class="content w-full">
        {#if activePage === 'dataTugasAkhir'}
            <UploadTable />
        {:else if activePage === 'jadwalSidang'}
            <Jadwal />
        {:else if activePage === 'feedback'}
            <Feedback />
        {/if}

    </div>

    <section>
         
    </section>
    

    
    
</section>

<style>
   .active {
  position: relative;
  background-color: gainsboro ;
  transition: background-color 500ms ease-in-out;
}


.active:hover {
  background-color: #e2e8f0;
}





</style>