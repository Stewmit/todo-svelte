<script>
	import { Drawer, Button } from 'flowbite-svelte';
	import GoalMateLogo from '$lib/images/goalmate_logo.png';
	import { Icon } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let hidden = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	const menuOptions = [
		{
			label: 'Профиль',
			href: '/app/profile',
			iconName: 'user-outline'
		},
		{
			label: 'Задачи',
			href: '/app/tasks',
			iconName: 'check-circle-outline'
		},
		// {
		// 	label: 'Фид',
		// 	href: '/app/feed',
		// 	iconName: 'bullhorn-outline'
		// },
		// {
		// 	label: 'Мой день',
		// 	href: '/app/myday',
		// 	iconName: 'clipboard-list-outline'
		// },
		// {
		// 	label: 'Календарь',
		// 	href: '/app/calendar',
		// 	iconName: 'calendar-week-outline'
		// },
		// {
		// 	label: 'Цели',
		// 	href: '/app/goals',
		// 	iconName: 'atom-solid'
		// },
		// {
		// 	label: 'Привычки',
		// 	href: '/app/habits',
		// 	iconName: 'chart-outline'
		// },
	];
</script>

<Button
	on:click={() => (hidden = false)}
	color="primary"
	pill={true}
	class="ml-3 w-10 h-10 sm:w-12 sm:h-12"
>
	<Icon name="bars-solid" class="w-4 h-4 sm:w-5 sm:h-5" />
</Button>

<Drawer
	bgOpacity="bg-opacity-50"
	transitionType="fly"
	{transitionParams}
	bind:hidden
	class="p-0 w-[250px] sm:w-[320px]"
>
	<div class="flex flex-col items-center">
		<div class="w-full flex justify-start items-center h-16">
			<img class="ml-3 sm:w-12 sm:h-12 w-10 h-10" src={GoalMateLogo} alt="GoalMate" />
			<div class="sm:text-5xl text-4xl font-bold ml-4">GoalMate</div>
		</div>
		<div class="w-full mt-4 pl-3">
			{#each menuOptions as { label, href, iconName }}
				{#if $page.url.pathname === href}
					<button
						class="w-full flex items-center py-4 pl-3 bg-primary-200 hover:bg-primary-100 rounded-l-[15px]"
						on:click={() => (hidden = true)}
					>
						<Icon name={iconName} class="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] text-gray-500" />
						<div class="text-[16px] sm:text-[18px] text-gray-500 ml-4">{label}</div>
					</button>
				{:else}
					<button
						class="w-full flex items-center py-4 pl-3 hover:bg-pink-200 rounded-l-[15px]"
						on:click={() => goto(href)}
					>
						<Icon name={iconName} class="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] text-gray-500" />
						<div class="text-[16px] sm:text-[18px] text-gray-500 ml-4">{label}</div>
					</button>
				{/if}
			{/each}
		</div>
	</div>
</Drawer>
