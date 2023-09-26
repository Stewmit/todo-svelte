<script>
	import GoalMateLogo from '$lib/images/goalmate_logo.png';
	import StartImage from '$lib/images/start_image.jpg';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center">
	<header>
		<div>
			<div class="flex justify-center items-center mt-14 w-full">
				<img
					class="lg:h-[100px] lg:w-[100px] md:h-[90px] md:w-[90px] sm:h-[80px] sm:w-[80px] xs:h-[70px] xs:w-[70px] h-[60px] w-[60px]"
					src={GoalMateLogo}
					alt="GoalMate"
				/>
				<h1 class="ml-4 font-bold lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-3xl">
					GoalMate
				</h1>
			</div>
		</div>
	</header>
	<main>
		<div>
			<div class="flex flex-col sm:flex-row justify-center items-center md:gap-20 gap-6">
				<div class="flex flex-col pl-0 sm:pl-10 md:mt-24 mt-10">
					<div class="flex flex-col items-center">
						<div class="lg:text-5xl md:text-4xl text-3xl font-bold">Мечтай!</div>
						<div class="mt-2 lg:text-5xl md:text-4xl text-3xl font-bold">Планируй!</div>
						<div class="mt-2 lg:text-5xl md:text-4xl text-3xl font-bold">Добивайся!</div>
					</div>
					<div class="mt-16">
						<ul>
							<li class="flex items-center whitespace-nowrap">
								<Icon icon="mdi:flag-variant" width="30" height="30" />
								<div class="ml-3 lg:text-3xl md:text-2xl text-[20px]">Ставь цели</div>
							</li>
							<li class="flex items-center mt-2 whitespace-nowrap">
								<Icon icon="mdi:check-circle-outline" width="30" height="30" />
								<div class="ml-3 lg:text-3xl md:text-2xl text-[20px]">Управляй задачами</div>
							</li>
							<li class="flex items-center mt-2 whitespace-nowrap">
								<Icon icon="mdi:chart-line" width="30" height="30" />
								<div class="ml-3 lg:text-3xl md:text-2xl text-[20px]">Отслеживай привычки</div>
							</li>
							<li class="flex items-center mt-2 whitespace-nowrap">
								<Icon icon="mdi:lightbulb-on-10" width="30" height="30" />
								<div class="ml-3 lg:text-3xl md:text-2xl text-[20px]">Вдохновляйся</div>
							</li>
							<li class="flex items-center mt-2 whitespace-nowrap">
								<Icon icon="mdi:share-variant" width="30" height="30" />
								<div class="ml-3 lg:text-3xl md:text-2xl text-[20px]">Делись результатами</div>
							</li>
						</ul>
					</div>
					<div class="flex justify-center mt-12">
						<button
							on:click={() => goto('/auth')}
							class="py-4 px-[90px] text-white rounded-2xl bg-gradient-to-r duration-700 from-fuchsia-500 via-indigo-500 to-cyan-400 lg:text-4xl md:text-3xl text-2xl"
							>Поехали!</button
						>
					</div>
				</div>
				<div class="lg:w-[40em] md:w-[34em] sm:w-[28em] xs:w-[23em] w-[20em]">
					<img src={StartImage} alt="GoalMate" />
				</div>
			</div>
		</div>
	</main>
</div>
