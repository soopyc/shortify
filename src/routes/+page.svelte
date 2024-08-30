<script lang="ts">
	import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from "$env/static/public";
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";
	import TextInput from "$lib/components/inputs/TextInput.svelte";

	// get the average of {MAX,MIN}_LENGTH to use as default to avoid hardcoding a broken value.
	const MIN_LENGTH = Number.parseInt(PUB_MIN_LENGTH)
	const MAX_LENGTH = Number.parseInt(PUB_MAX_LENGTH)
	export let rangeValue = Math.floor((MIN_LENGTH + MAX_LENGTH) / 2);
</script>

<svelte:head>
	<title>{makeTitle()}</title>
</svelte:head>

<!-- Input -->
<form method="post" class="mt-2">
	<div class="flex md-1">
		<TextInput
			placeholder="Type or paste in a URL to shorten..."
			extraClass="flex-grow"
			id="url"
			autocomplete="off"
		/>
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
