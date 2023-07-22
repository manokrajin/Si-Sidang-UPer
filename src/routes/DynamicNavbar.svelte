<script>
    import Navbar from "./navbar.svelte";
    import NavbarLogin from "./navbarLogin.svelte";
    import { userStore } from "./login/loginStore";
  </script>
  
  {#if $userStore.isLogin}
    <NavbarLogin />
  {:else}
    <Navbar />
  {/if}