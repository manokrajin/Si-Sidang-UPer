<script>
    import { loginState } from "./login/loginStore";

    function logout() {
        loginState.set(false);
        window.location.href = "/login";
    }
</script>

<navbar class="flex flex-row justify-between w-full p-3 px-7 shadow-lg">
    
    <div class="left my-1 ">
            <img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP"  />
    </div>
    
    <div class="right flex justify-end w-6/12">
        <div class="namaAplikasi px-1 my-auto">
            <a class="hover:text-primary" href="/#/">Jadwal Sidang</a>
        </div>
        <div class="home mx-10 place-content-center my-auto hover:text-primary ho">
            <a href="/mahasiswa/cekJadwal">Beranda</a>
        </div>
    
        <button on:click={logout} class="bg-primary/90 rounded  m-2 px-3 mx-1 hover:bg-red-alert transition duration-700 ease-in-out ">
            <a href="" class="text-white">Logout</a>
        </button>
    </div>
    
</navbar>

<style>
    img {
        width: 60px;
        height: 44px;
    }
</style>