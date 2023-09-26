<script>
	import { Input, Checkbox, Button, Modal } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';
	import { Textarea } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { _createTask, _updateTask, _deleteTask, _loadTasks } from '../../../routes/app/tasks/+page';
	import { tasks } from '$lib/stores/task';

	export let open;
	export let task;

	let newSubtaskName = '';

	let choosingColor = true;
	let defaultColors = ['#52489C', '#FFE45E', '#B9E6FF', '#F87575', '#4D7298', '#0000d6'];

	function addSubtask() {
		task.subtasks = task.subtasks.concat({ name: newSubtaskName, isComplete: false });
		newSubtaskName = '';
	}

	function removeSubtask(i) {
		task.subtasks.splice(i, 1);
		task.subtasks = task.subtasks;
	}

	async function handleSave() {
		if (!task.id) {
			await _createTask(task)
		}
		else {
			await _updateTask(task)
		}
		await _loadTasks()
		open = false;
	}

	async function handleDelete(id) {
		await _deleteTask(id)
		$tasks = $tasks.filter(task => task.id !== id)
		open = false;
	}

	function handleCancel() {
		open = false;
	}
</script>

<Modal title="Задача" bind:open size="lg" class="h-[75vh]">
	<div class="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2">
		<div class="w-full flex flex-col gap-2">
			<div class="flex justify-between items-center">
				<input
					type="text"
					bind:value={task.name}
					placeholder="Название"
					required
					class="p-0.5 mr-2 border-0 focus:border-primary focus:ring-0 min-w-[50px] w-full"
				/>
				<div class="flex items-center gap-1">
					<Checkbox bind:checked={task.isComplete} class="mr-[2px]" color="primary" />
					<button
						style="color: {task.highlightColor ?? ''};"
						class="transition transition-color hover:text-primary-700"
						on:click={() => (choosingColor = !choosingColor)}
					>
						<Icon icon="material-symbols:palette" class="" width="20px" />
					</button>
					{#if task.id}
						<button class="transition transition-color hover:text-primary-700" 
						on:click={() => handleDelete(task.id)}>
							<Icon icon="ph:trash" width="20px" />
						</button>
					{/if}
				</div>
			</div>
			{#if choosingColor}
				<div transition:slide class="drop-shadow-md bg-neutral-100 p-2 rounded-md">
					<div class="flex justify-between mb-3">
						<h4>Выберите цвет</h4>
						<button on:click={() => (choosingColor = false)}>
							<Icon icon="fa6-solid:xmark" />
						</button>
					</div>
					<div class="flex w-full gap-2 items-center">
						{#each defaultColors as defaultColor}
							<button
								class="w-full h-10"
								style="background: {defaultColor};"
								on:click={() => (task.highlightColor = defaultColor)}
							/>
						{/each}
					</div>
				</div>
			{/if}
			<Input bind:value={task.date} type="date" placeholder="Дата" required />
			<Textarea placeholder="Описание" />
		</div>

		<div class="h-full">
			<h4 class="mb-2 font-bold">Подзадачи:</h4>
			<div class="flex flex-col gap-2">
				{#each task.subtasks as subtask, i (i)}
					<div transition:fade animate:flip class="flex gap-1 w-full">
						<input
							type="text"
							placeholder="Подзадача"
							bind:value={subtask.name}
							required
							class="p-0.5 border-t-0 border-l-0 border-r-0 w-full focus:border-primary focus:ring-0 min-w-[50px]"
						/>
						<Checkbox bind:checked={subtask.isComplete} />
						<button
							class="transition transition-color hover:text-primary-700"
							on:click={() => removeSubtask(i)}
						>
							<Icon icon="ph:trash" />
						</button>
					</div>
				{/each}
				<div class="flex gap-1 w-full">
					<input
						type="text"
						placeholder="Подзадача"
						bind:value={newSubtaskName}
						required
						class="p-0.5 border-t-0 border-l-0 border-r-0 w-full focus:border-primary focus:ring-0 min-w-[50px]"
					/>
					<button on:click={addSubtask}>
						<Icon icon="system-uicons:plus" width="20px" />
					</button>
				</div>
			</div>
		</div>
	</div>

	<svelte:fragment slot="footer">
		<Button on:click={handleSave}>Сохранить</Button>
		<Button on:click={handleCancel} color="alternative">Отмена</Button>
	</svelte:fragment>
</Modal>
