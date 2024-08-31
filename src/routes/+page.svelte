<script lang="ts">
	import { enhance } from "$app/forms";
	import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from "$env/static/public";
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";

	// get the average of {MAX,MIN}_LENGTH to use as default to avoid hardcoding a broken value.
	const MIN_LENGTH = Number.parseInt(PUB_MIN_LENGTH);
	const MAX_LENGTH = Number.parseInt(PUB_MAX_LENGTH);
	export let rangeValue = Math.floor((MIN_LENGTH + MAX_LENGTH) / 2);
</script>

<svelte:head>
	<title>{makeTitle()}</title>
</svelte:head>

<!-- Input -->
<form method="post" class="mt-2" use:enhance>
	<div class="flex md-1 gap-1">
		<input
			name="link"
			type="text"
			placeholder="Type or paste in a URL to shorten..."
			class="rounded-md border-2 border-black dark:border-white dark:bg-black px-2 py-1 flex-grow"
			id="url"
			autocomplete="off"
		/>
		<button type="submit" class="px-2 border-2 rounded-md border-black dark:border-white">Shorten!</button>
	</div>
	<div>
		<Heading level={2}>Settings</Heading>
		<label>
			Length: {rangeValue}
			<input
				bind:value={rangeValue}
				class="w-full"
				id="length"
				type="range"
				step="1"
				min={PUB_MIN_LENGTH}
				max={PUB_MAX_LENGTH}
			/>
		</label>
	</div>
</form>
