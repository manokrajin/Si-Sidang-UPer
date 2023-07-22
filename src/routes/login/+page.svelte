<script>
	import { loginState } from "./loginStore";

	function handleLogin(){
		
		loginState.set(true);
		console.log(loginState);


	}
</script>

<div class="w-full h-screen flex items-center bg-gray-100">
	<section class="flex items-stretch justify-center w-full">
		<div class="formContainer w-11/12 border-2 p-6 rounded-xl bg-white">
			<div class="Logo m-50 flex justify-center">
				<img src="https://i.ibb.co/cb8Z0fW/Logo-Up-1.png" alt="Logo-UP" class="m-5" />
			</div>
			<div class="formHeader text-center">
				<h1 class="text-xl text-title-text/90 font-bold">
					Sistem Informasi Penjadwalan Sidang Universitas Pertamina
				</h1>
			</div>
			<div class="formBody">
				<form action="" method="get" class="">
					<div class="formGroup my-3">
						<label for="username">Username</label><br />
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							class="formInput w-full p-2 border-2 rounded-md my-1 color-grey"
						/>
					</div>
					<div class="formGroup">
						<label for="password">Password</label><br />
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							class="formInput w-full p-2 border-2 rounded-md my-1"
						/>
					</div>
					<div class="formGroup text-center text-white">
						<br /><button
							type="submit"
							class="formButton border-2 px-5 py-2 rounded-md bg-primary/90"
							on:click={handleLogin}>Login</button
						>
					</div>
				</form>
			</div>
			<div class="register">
				<p class="text-center">
					Belum punya akun? <a href="/register" class="text-primary/90">Daftar</a>
				</p>
			</div>
		</div>
	</section>
</div>
