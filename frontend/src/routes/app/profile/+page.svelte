<script>
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_API_URL } from '$env/static/public';
	import { Button } from 'flowbite-svelte';
	import TruncatedSpan from '$lib/ui/TruncatedSpan.svelte';

	const logout = async () => {
		$user = undefined;
		localStorage.setItem('token', '');
		goto('/');
	};
</script>

<div class="h-[calc(100vh-64px)] w-full flex justify-center mt-[64px] bg-gray-100">
	<div style="grid-template-columns: 200px 1fr;" class="grid grid-cols-2 gap-6 bg-white h-[300px] shadow-md rounded-lg p-8 mt-8">
		<div class="flex justify-center items-start">
			<img
			class=""
			src={$user?.avatar
				? PUBLIC_SERVER_API_URL + 'users/' + $user.avatar
				: 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
			alt="avatar"
		/>
		</div>
		<div class="flex flex-col items-start">
			<div class="flex items-center gap-2 border-b-[1px] border-gray-400 w-full pb-1">
				<span class="text-[18px] font-bold">Имя:</span>
				<TruncatedSpan value={$user?.name}/>
			</div>
			<div class="flex items-center gap-2 border-b-[1px] border-gray-400 w-full pb-1">
				<span class="text-[18px] font-bold">Фамилия:</span>
				<TruncatedSpan value={$user?.surname}/>
			</div>
			<div class="flex items-center gap-2 border-b-[1px] border-gray-400 w-full pb-1">
				<span class="text-[18px] font-bold">Почта:</span>
				<TruncatedSpan value={$user?.email}/>
			</div>
			<div class="flex justify-center w-full mt-6">
				<Button class="py-4 px-10 bg-red-600 hover:bg-red-700" on:click={logout}>Выход</Button>
			</div>
		</div>
	</div>
</div>

<div class=" flex justify-center items-center" />
