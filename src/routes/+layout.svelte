<script>
    import "../app.css";
   
    import { onMount } from 'svelte';

    let url = ``;

    onMount(() => url = window.location.href);

    
  

  </script>

<div class="app">



	<main>
		<slot />
	</main>

	<footer>
		<p>manokrajin 2023</p>
	</footer>
</div>
