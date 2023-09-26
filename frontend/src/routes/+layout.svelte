<script>
	import '../app.css';
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { check } from '$lib/http/userAPI';
	import { Jumper } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let isLoading = true;

	onMount(async () => {
		check()
			.then((data) => {
				user.set({
					id: data.id,
					name: data.name,
					surname: data.surname,
					email: data.email,
					avatar: data.avatar
				});

				if ($page.url.pathname === '/auth' || $page.url.pathname === '/') {
					goto('/app/profile');
				}
			})
			.catch(() => {
				if ($page.url.pathname !== '/auth') {
					goto('/');
				}
			})
			.finally(() => (isLoading = false));
	});
</script>

<div class="app ">
	<main>
		{#if isLoading}
			<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
		{:else}
			<slot />
		{/if}
	</main>
</div>

<style>
	:root { 
		@apply bg-white;
	}

</style>
