<script>
	import { login, registration } from '$lib/http/userAPI';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { Label, Input, Button } from 'flowbite-svelte';
	import { z } from 'zod';

	const registerSchema = z
		.object({
			name: z
				.string({ required_error: 'Необходимо заполнить имя' })
				.min(1, { message: 'Необходимо заполнить имя' })
				.max(64, { message: 'Длина имени не может превышать 64 символа' })
				.trim(),
			surname: z
				.string({ required_error: 'Необходимо заполнить фамилию' })
				.min(1, { message: 'Необходимо заполнить фамилию' })
				.max(64, { message: 'Длина фамилии не может превышать 64 символа' })
				.trim(),
			email: z
				.string({ required_error: 'Необходимо заполнить адрес почты' })
				.min(1, { message: 'Необходимо заполнить адрес почты' })
				.max(64, { message: 'Длина адреса почты не может превышать 64 символа' })
				.email({ message: 'Некорректный адрес почты' }),
			password: z
				.string({ required_error: 'Необходимо ввести пароль' })
				.min(6, { message: 'Пароль должен включать не менее 6-ти символов' })
				.max(32, { message: 'Длина пароля не может превышать 64 символа' })
				.trim(),
			passwordConfirm: z
				.string({ required_error: 'Необходимо ввести пароль' })
				.min(6, { message: 'Пароль должен включать не менее 6-ти символов' })
				.max(32, { message: 'Длина пароля не может превышать 64 символа' })
				.trim()
		})
		.superRefine(({ passwordConfirm, password }, ctx) => {
			if (passwordConfirm !== password) {
				ctx.addIssue({
					code: 'custom',
					message: 'Пароли не совпадают',
					path: ['password']
				});
				ctx.addIssue({
					code: 'custom',
					message: 'Пароли не совпадают',
					path: ['passwordConfirm']
				});
			}
		});

	const loginSchema = z.object({
		email: z
			.string({ required_error: 'Необходимо заполнить адрес почты' })
			.min(1, { message: 'Необходимо заполнить адрес почты' })
			.max(64, { message: 'Длина адреса почты не может превышать 64 символа' })
			.email({ message: 'Некорректный адрес почты' }),
		password: z
			.string({ required_error: 'Необходимо ввести пароль' })
			.min(6, { message: 'Пароль должен включать не менее 6-ти символов' })
			.max(32, { message: 'Длина пароля не может превышать 64 символа' })
			.trim()
	});

	let isRegisterForm = true;
	let formData = {
		name: '',
		surname: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};
	let errors = {};
	let requestError = '';

	function switchForms() {
		isRegisterForm = !isRegisterForm;
		formData = {
			name: '',
			surname: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};
		errors = {};
		requestError = '';
	}

	function validateForm() {
		try {
			if (isRegisterForm) {
				registerSchema.parse(formData);
			} else {
				loginSchema.parse(formData);
			}
			errors = {};
			return true;
		} catch (err) {
			errors = err.flatten().fieldErrors;
			return false;
		}
	}

	async function submitForm() {
		if (validateForm()) {
			let data;
			try {
				if (isRegisterForm) {
					data = await registration(
						formData.name,
						formData.surname,
						formData.email,
						formData.password
					);
				} else {
					data = await login(formData.email, formData.password);
				}
				$user = {
					id: data.id,
					name: data.name,
					surname: data.surname,
					email: data.email,
					avatar: data.avatar
				};
				goto('/app/profile');
			} catch (err) {
				requestError = err.response.data.message;
			}
		}
	}
</script>

<main>
	<div class="h-screen flex justify-center items-center xs:items-start bg-gray-100 xs:bg-white">
		<form
			class="flex flex-col mt-8 items-center bg-white sm:shadow-md shadow-none lg:w-[480px] xs:w-[460px] w-[440px] rounded-lg px-10 py-8"
		>
			{#if isRegisterForm}
				<h1 class="text-4xl font-bold">Регистрация</h1>
			{:else}
				<h1 class="text-4xl font-bold">Авторизация</h1>
			{/if}
			<div class="text-red-500 text-center mt-6">{requestError}</div>
			<div class="mt-2 w-full">
				{#if isRegisterForm}
					<div>
						<Label for="name-input" class="block mb-1 text-1xl" size="lg">Имя</Label>
						<Input id="name-input" size="lg" bind:value={formData.name} />
						{#if errors?.name}
							<Label for="name-input" class="block mt-1 text-1xl text-red-500" size="lg"
								>{errors?.name[0]}</Label
							>
						{/if}
					</div>
					<div class="mt-2">
						<Label for="surname-input" class="block mb-1 text-1xl" size="lg">Фамилия</Label>
						<Input id="surname-input" size="lg" bind:value={formData.surname} />
						{#if errors?.surname}
							<Label for="surname-input" class="block mt-1 text-1xl text-red-500" size="lg"
								>{errors?.surname[0]}</Label
							>
						{/if}
					</div>
				{:else}
					<div />
				{/if}
				<div class="mt-2">
					<Label for="email-input" class="block mb-1 text-1xl" size="lg">Почта</Label>
					<Input id="email-input" size="lg" bind:value={formData.email} />
					{#if errors?.email}
						<Label for="email-input" class="block mt-1 text-1xl text-red-500" size="lg"
							>{errors?.email[0]}</Label
						>
					{/if}
				</div>
				<div class="mt-2">
					<Label for="password-input" class="block mb-1 text-1xl" size="lg">Пароль</Label>
					<Input type="password" id="password-input" size="lg" bind:value={formData.password} />
					{#if errors?.password}
						<Label for="password-input" class="block mt-1 text-1xl text-red-500" size="lg"
							>{errors?.password[0]}</Label
						>
					{/if}
				</div>
				{#if isRegisterForm}
					<div class="mt-2">
						<Label for="password-confirm-input" class="block mb-1 text-1xl" size="lg"
							>Повтор пароля</Label
						>
						<Input
							type="password"
							id="password-confirm-input"
							size="lg"
							bind:value={formData.passwordConfirm}
						/>
						{#if errors?.passwordConfirm}
							<Label for="password-confirm-input" class="block mt-1 text-1xl text-red-500" size="lg"
								>{errors?.passwordConfirm[0]}</Label
							>
						{/if}
					</div>
				{/if}
				<div class="flex justify-center mt-6">
					<div class="flex flex-col w-full items-start">
						<button class="font-bold mb-2" on:click={switchForms}>
							{#if isRegisterForm}
								<div>Есть аккаунт</div>
							{:else}
								<div>Создать аккаунт</div>
							{/if}
						</button>
						<Button on:click={submitForm} class="w-full text-1xl" color="primary">
							{#if isRegisterForm}
								<div>Зарегистрироваться</div>
							{:else}
								<div>Войти</div>
							{/if}
						</Button>
					</div>
				</div>
			</div>
		</form>
	</div>
</main>
