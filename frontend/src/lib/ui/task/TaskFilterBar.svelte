<script>
	import { Radio, Checkbox } from 'flowbite-svelte';
	import { taskSort, taskFilter, showComplete } from '$lib/stores/task';
	import { _loadTasks } from '../../../routes/app/tasks/+page';

	const sortTales = [
		{
			title: 'Новизне',
			value: 'id'
		},
		{
			title: 'Дате',
			value: 'date'
		},
		{
			title: 'Алфавиту',
			value: 'name'
		}
	];

	const filterTales = [
		{
			title: 'Все',
			value: ''
		},
		{
			title: 'Запланированные',
			value: 'planned'
		},
		{
			title: 'Выделенные',
			value: 'highlighted'
		},
		{
			title: 'Ведущие к цели',
			value: 'goal-connected'
		}
	];
	async function testFunc() {
		await _loadTasks();
	}
</script>

<div class="flex flex-col justify-center items-center w-full">
	<div class="text-[26px] md:text-[28px] font-bold">Фильтры</div>
	<div class="mt-2 flex flex-col w-full items-center">
		<div class="divide-y divide-slate-200 w-full">
			<Checkbox
				color="primary"
				class="mt-1 text-[16px] md:text-[18px] mb-2"
				bind:checked={$showComplete}>Завершенные</Checkbox
			>
			<div class="flex flex-col pt-2">
				{#each filterTales as filterTale}
					<li class="w-full flex justify-start">
						<Radio
							on:change={testFunc}
							color="primary"
							bind:group={$taskFilter}
							name="filtering"
							bind:value={filterTale.value}
							class="p-1 text-[16px] md:text-[18px]">{filterTale.title}</Radio
						>
					</li>
				{/each}
			</div>
		</div>
		<div class="mt-2 w-full">
			<div class="text-[22px] md:text-[24px]">Сортировка по</div>
			<ul class="mt-1 p-1 flex flex-col items-start w-auto rounded-lg border border-gray-200">
				{#each sortTales as sortTale}
					<li class="w-auto flex justify-center">
						<Radio
							on:change={testFunc}
							color="primary"
							bind:group={$taskSort}
							name="sorting"
							bind:value={sortTale.value}
							class="p-1 text-[16px] md:text-[18px]"
							>{sortTale.title}
						</Radio>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
