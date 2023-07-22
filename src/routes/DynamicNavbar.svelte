<script>
    import Navbar from "./navbar.svelte";
    import NavbarLogin from "./navbarLogin.svelte";
    import { loginState } from "./login/loginStore";
  </script>
  
  {#if $loginState}
    <NavbarLogin />
  {:else}
    <Navbar />
  {/if}