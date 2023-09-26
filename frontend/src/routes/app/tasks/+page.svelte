<script>
	import { tasks, showComplete } from '$lib/stores/task';
	import { Button, Modal } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import { _updateTask } from './+page';
	import TasksFilters from '$lib/ui/task/TaskFilterBar.svelte';
	import TaskModal from '$lib/ui/modals/TaskModal.svelte';

	import Checkbox from '$lib/ui/task/Checkbox.svelte';
	import TruncatedSpan from '$lib/ui/TruncatedSpan.svelte';
	import { format } from 'date-fns';

	let filtersModal = false;
	let taskModal = false;
	let currentTask = {};

	function createTask() {
		currentTask = {
			name: "",
			isComplete: false,
			date: null,
			description: "",
			highlightColor: "",
			subtasks: []
		};
		taskModal = true;
	}

	function openTask(task) {
		currentTask = task;
		taskModal = true;
		console.log(currentTask)
	}
</script>

<button
	class="fixed bottom-[10px] right-[10px] rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-primary-700 hover:bg-primary-800 flex justify-center items-center"
	on:click={() => (filtersModal = true)}
>
	<Icon name="adjustments-horizontal-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
</button>
<Modal bind:open={filtersModal} size="sm">
	<div class="flex justify-center">
		<TasksFilters />
	</div>
</Modal>

<Button
	on:click={createTask}
	class="fixed bottom-[10px] right-[68px] sm:right-[76px] bg-primary-700 w-12 h-12 sm:w-14 sm:h-14 rounded-full drop-shadow-lg flex justify-center items-center hover:bg-primary-800 z-10"
>
	<Icon name="plus-solid" class="sm:w-5 sm:h-5 w-4 h-4 text-white" />
</Button>

<TaskModal task={currentTask} bind:open={taskModal} />

<div class="w-full flex justify-center mt-[64px]">
	<div class="w-full min-h-[400px] h-auto pb-[76px] px-[4%]">
		<div class="flex flex-col justify-center items-center">
			{#if $tasks.length === 0}
				<div
					class="mt-12 w-full flex justify-center items-center xs:text-[22px] sm:text-[26px] md:text-[28px] text-[32px]"
				>
					У вас нет задач
				</div>
			{:else}
				<div class="text-md text-primary-content/70 w-[100%]">
					{#each $tasks as task}
						{#if $showComplete || !task.isComplete}
							<div class="flex items-center gap-3 mt-6">
								<div
									class="bg-[#f5f5f5] custom_columns grid w-full grid-rows-1 gap-x-2 transition-shadow shadow-md rounded-lg items-center xs:h-[56px] h-[48px] pr-2"
									style="background: {task.highlightColor}"
								>
									<TruncatedSpan
										on:click={() => openTask(task)}
										value={task.name}
										class="flex items-center text-primary-content lg:text-[18px] sm:text-[16px] text-[14px] pl-2 h-full rounded-lg cursor-pointer"
									/>
									<div class="flex flex-col">
										{#if task.subtasks.length}
											<div
												class="text-center overflow-hidden text-ellipsis lg:text-[17px] sm:text-[15px] xs:text-[14px] text-[12px] leading-4 mb-[2px]"
											>
												{`${task.subtasks.reduce(
													(accumulator, subtask) => accumulator + subtask.isComplete,
													0
												)}/${task.subtasks.length}`}
											</div>
										{:else}
											<div />
										{/if}
										{#if task.date}
											<TruncatedSpan
												class="text-center lg:text-[17px] sm:text-[15px] xs:text-[14px] text-[12px] px-[2px] rounded-lg border border-gray-800"
												value={format(new Date(task.date), 'dd.MM.yyyy')}
											/>
										{:else}
											<div />
										{/if}
									</div>
									<Checkbox on:switch={() => _updateTask(task)} bind:isComplete={task.isComplete} />
								</div>
								<!-- Condition for goals -->
								{#if true}
									<div class="w-[56px] h-[56px]" />
								{:else}
									<button
										class="xs:min-w-[56px] xs:min-h-[56px] min-w-[48px] min-h-[48px] bg-green-200 rounded-full"
										on:click={() => console.log('Open goal modal')}
									/>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.custom_columns {
		grid-template-columns: 1fr auto 30px;
	}
</style>
