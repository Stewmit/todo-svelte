<script>
	import { createEventDispatcher } from 'svelte';

	export let value;

	const dispatch = createEventDispatcher();

	function clickHandler() {
		dispatch('click', {});
	}
</script>

<span on:click={clickHandler} class="block w-full truncate {$$props.class ?? ''}" title={value}>
	{value}
</span>
