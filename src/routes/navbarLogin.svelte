<script>
    // @ts-nocheck
	import { goto } from "$app/navigation";
    import { userStore } from "./login/loginStore";
	import { logoutUser } from "./service/login";

    function beranda() {
     
        goto("/mahasiswa/cekJadwal")
    }
    function logout() {
        logoutUser().then(() => {
            goto("/")
        })
    }
</script>

<navbar class="flex flex-row justify-between w-full p-3 px-7 shadow-lg">
    
    <div class="left my-1 ">
            <img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP"  />
    </div>
    
    <div class="right flex justify-end w-6/12">
        <div class="namaAplikasi mx-4 my-auto">
            <a class="hover:text-primary" href="/#/">Jadwal Sidang</a>
        </div>
        <div class="home mx-4 place-content-center my-auto hover:text-primary">
            <button on:click={beranda}>Beranda</button>
        </div>

        <div class="home mx-4 place-content-center my-auto">
            <span class="capitalize">Halo, {$userStore.user.nama}!</span>
        </div>
    
        <button on:click={logout} class="bg-primary/90 rounded  m-2 px-3 mx-1 hover:bg-red-alert transition duration-700 ease-in-out ">
            <span class="text-white">Logout</span>
        </button>
    </div>
    
</navbar>

<style>
    img {
        width: 60px;
        height: 44px;
    }
</style>