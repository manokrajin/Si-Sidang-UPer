<!-- RegisterForm.svelte -->

<script>
	import registerAdmin from '../../../service/registerAdmin';
    import Swal from 'sweetalert2';

    let email = '';
    let password = '';
	async function handleSubmit() {
		// Handle registration logic here (e.g., sending registration request to the server)
		console.log('Registration form submitted!');
		 email = document.getElementById('email').value;
		 password = document.getElementById('password').value;

        if(!email || !password) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000
            });
            return;
        }

        if(password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'Password must be at least 6 characters long',
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000
            });
            return;
        }

        await registerAdmin(email, password).then((res) => {
            Swal.fire({
                title: 'Success',
                text: 'Registration success',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            });
        }).catch((err) => {
            Swal.fire({
                title: 'Error',
                text: 'Registration failed',
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000
            });
        });
	}
</script>

<div class="flex items-center justify-center">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email: </label>
			<input
				type="email"
				id="email"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password: </label>
			<input
				type="password"
				id="password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				bind:value={password}
				required
			/>
		</div>
		<div class="flex items-center justify-between">
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Register
			</button>
		</div>
	</form>
</div>
