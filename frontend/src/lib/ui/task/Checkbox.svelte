<script>
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let isComplete = false;

	const dispatch = createEventDispatcher();

	function checkboxClick() {
		isComplete = !isComplete;
		dispatch('switch', {});
	}
</script>

<button
	on:click={checkboxClick}
	class="{$$props.class ??
		''} border-2 border-gray-700 rounded-full xs:w-6 xs:h-6 w-5 h-5 flex justify-center items-center"
>
	{#if isComplete}
		<Icon icon="ic:baseline-check" class="xs:w-6 xs:h-6 w-5 h-5" />
	{:else}
		<div />
	{/if}
</button>
