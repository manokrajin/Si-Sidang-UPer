<script>
    import LoginForm from './Component/Login/login.svelte'
    import RegisterForm from './Component/Register/register.svelte'
  
    let showLogin = true;
  
    function toggleForm() {
      showLogin = !showLogin;
    }
  </script>
  
  <main class="bg-gray-200 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md max-w-md text-center">
      {#if showLogin}
        <h2 class="text-2xl font-semibold mb-4 align-center">Login</h2>
        <LoginForm />
        <p class="mt-4 text-center">Don't have an account? <button class="text-blue-500 hover:text-blue-700" on:click={toggleForm}>Register here.</button></p>
      {:else}
        <h2 class="text-2xl font-semibold mb-4">Register</h2>
        <RegisterForm />
        <p class="mt-4 text-center">Already have an account? <button class="text-blue-500 hover:text-blue-700" on:click={toggleForm}>Login here.</button></p>
      {/if}
    </div>
  </main>
  

