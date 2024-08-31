<script lang="ts">
	import { enhance } from "$app/forms";
	import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from "$env/static/public";
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";
	import type { SubmitFunction } from "./$types";
	// get the average of {MAX,MIN}_LENGTH to use as default to avoid hardcoding a broken value.
	const MIN_LENGTH = Number.parseInt(PUB_MIN_LENGTH);
	const MAX_LENGTH = Number.parseInt(PUB_MAX_LENGTH);
	export let rangeValue = Math.floor((MIN_LENGTH + MAX_LENGTH) / 2);

	export let form;
	export let shortenerValue: string;

	// this is done this way instead of placing directly in use:enhance due to
	// https://github.com/sveltejs/kit/issues/7161#issuecomment-1925796822
	export const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			await update({ reset: false });

			if (result.type == "success" && result.data) {
				shortenerValue = result.data.shortlink ?? "unknown error";
			}
		};
	};
</script>

<svelte:head>
	<title>{makeTitle()}</title>
</svelte:head>

<!-- Input -->
<form method="post" class="mt-2" use:enhance={enhancer}>
	<div class="flex md-1 gap-1">
		<input
			name="link"
			type="text"
			placeholder="Type or paste in a URL to shorten..."
			class="rounded-md border-2 border-black dark:border-white dark:bg-black px-2 py-1 flex-grow"
			autocomplete="off"
			bind:value={shortenerValue}
		/>
		<button
			type="submit"
			class="px-2 border-2 rounded-md border-black dark:border-white"
		>
			Shorten!
		</button>
	</div>

	<!-- handled this way because form might be undefined and we don't want to be showing an error dialog all the time -->
	{#if form?.success == false}
		<div>
			<Heading level={3} extraClass="text-light-red dark:text-dark-red"
				>Warning</Heading
			>
			<p class="text-light-red dark:text-dark-red">
				An error occurred while generating the shortlink:
			</p>
			<p class="ml-3 text-light-red dark:text-dark-red">{form.message}</p>
		</div>
	{:else if form?.success == true}
		<noscript>
			<Heading level={3}>Success</Heading>
			<p>
				Your shortlink is: <span class="select-all">{form.shortlink}</span>
			</p>
		</noscript>
	{/if}

	<div>
		<Heading level={2}>Settings</Heading>
		<label>
			Length: {rangeValue}
			<input
				bind:value={rangeValue}
				class="w-full"
				name="length"
				type="range"
				step="1"
				min={PUB_MIN_LENGTH}
				max={PUB_MAX_LENGTH}
			/>
		</label>
	</div>
</form>
