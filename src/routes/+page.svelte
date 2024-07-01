<script lang="ts">
	import { PUB_MAX_LENGTH, PUB_MIN_LENGTH } from "$env/static/public";
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";
	import TextInput from "$lib/components/inputs/TextInput.svelte";

	export let rangeValue = 4;
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
