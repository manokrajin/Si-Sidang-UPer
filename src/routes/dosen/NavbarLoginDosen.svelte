<script>
    import { loginState } from "../login/loginStore";
     function logout() {
        loginState.set(false);
        window.location.href = "/login";
    }
</script>

<div class="navbar flex justify-between">
    <div class="left">
        <div class="logo">
            <img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP" class="m-5" /> 
        </div>
    </div>
    <div class="right flex">
        <div class="beranda my-auto mx-3 hover:text-primary transition duration-200 ease-in-out">
            <a href="">Beranda</a>
        </div>
        <div class="biodata my-auto mx-3 hover:text-primary transition duration-200 ease-in-out">
            <a href="">
                Jadwal Kosong
            </a>
        
        </div>
        <div class="logout my-auto mx-3">
            <button on:click={logout} class="bg-primary/90 rounded  m-2 p-3 mx-1 hover:bg-red-alert transition duration-700 ease-in-out ">
                <a href="" class="text-white">Logout</a>
            </button>
        </div>

    </div>
</div>

<style>
    img {
        width: 60px;
        height: 44px;
    }
</style>