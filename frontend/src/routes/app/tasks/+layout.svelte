<script>
	import { onMount } from 'svelte';
	import { _loadTasks } from './+page';

	onMount(_loadTasks);
</script>

<div class="app">
	<slot />
</div>
