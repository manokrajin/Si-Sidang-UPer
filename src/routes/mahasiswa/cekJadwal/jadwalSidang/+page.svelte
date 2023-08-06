<script>
    import UploadTable from './uploadTable.svelte';
    import Jadwal from './jadwal.svelte';
    import DynamicNavbar from '../../../DynamicNavbar.svelte';
    import Feedback from './feedback/feedback.svelte';

    let activePage = 'dataTugasAkhir';

    let isHoveredNavItem = '';

function handleNavItemHover(item) {
    isHoveredNavItem = item;
}
    function setActivePage(page) {
        activePage = page;
    }
</script>

<section>
    <div class="title w-full flex justify-center my-10 font-bold text-primary/90 text-xl">
        Data Tugas Akhir
    </div>   
    <div class="navbar flex justify-center m-10 " >

        <div 
            class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer" 
            class:active={activePage === 'dataTugasAkhir'} 
            class:hover={isHoveredNavItem === 'dataTugasAkhir'}
            on:click={() => setActivePage('dataTugasAkhir')}
            on:mouseover={() => handleNavItemHover('dataTugasAkhir')}
            on:mouseout={() => handleNavItemHover('')}
        >
            Data Tugas Akhir
        </div>
        <div 
            class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer" 
            class:active={activePage === 'jadwalSidang'} 
            class:hover={isHoveredNavItem === 'jadwalSidang'}
            on:click={() => setActivePage('jadwalSidang')}
            on:mouseover={() => handleNavItemHover('jadwalSidang')}
            on:mouseout={() => handleNavItemHover('')}
        >
            Jadwal Sidang Saya
        </div>
        <div 
            class="navItem flex justify-center border-b-2 items-center p-3 px-10 cursor-pointer" 
            class:active={activePage === 'feedback'} 
            class:hover={isHoveredNavItem === 'feedback'}
            on:click={() => setActivePage('feedback')}
            on:mouseover={() => handleNavItemHover('feedback')}
            on:mouseout={() => handleNavItemHover('')}
        >
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
    .navbar {
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .navItem {
        display: flex;
        justify-content: center;
        border-bottom: 2px solid transparent;
        align-items: center;
        padding: 3px 10px;
        cursor: pointer;
        transition: border-color 0.3s ease, transform 0.3s ease; /* Efek transisi untuk perubahan border-color dan transformasi */
    }

    .navItem.active {
        border-color: #3182ce;
        transform: translateY(-2px); /* Geser ke atas sedikit saat tab aktif */
    }
    .navItem:hover {
        border-color: #3182ce;
        transform: translateY(-2px);
    }
</style>

