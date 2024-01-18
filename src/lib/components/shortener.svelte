<script lang="ts">
	import octicons from "@primer/octicons";
	import { fade, fly } from "svelte/transition";
	import ErrorDisplay from "$lib/components/errorDisplay.svelte";
	import type {ErrorType} from "$lib/sharedTypes"

	enum ShortlinkModes {
		Random = "random",
		Manual = "manual",
	}

	interface AdvancedInterface {
		shortlinkMode: ShortlinkModes;
	}

	export let advancedConfig: AdvancedInterface = {
		shortlinkMode: ShortlinkModes.Random,
	};
	export let showAdvanced = false;
	export let shortenUrl = "";
	export let processing: boolean = false;
	export let error: Error | TypeError | undefined = undefined;

	export function toggleAdvanced() {
		showAdvanced = !showAdvanced;
	}

	export async function shorten() {
		processing = true;
		error = undefined;
		try {
			const _ = new URL(shortenUrl);
			// arbitrary delay
			await new Promise((resolve) => {
				setTimeout(() => resolve(null), 2500);
			});
			throw new Error("error");
		} catch (e: any) {
			error = e;
		} finally {
			processing = false;
		}
	}
</script>

<div id="main">
	<!-- Figure out how to unjs this later -->
	<button on:click={toggleAdvanced}>
		{#if !showAdvanced}
			<IconMenu />
		{:else}
			<IconX />
		{/if}
	</button>

	<input
		type="text"
		placeholder="Enter or paste in a URL..."
		contenteditable="true"
		on:keydown={() => {
			error = undefined;
		}}
		bind:value={shortenUrl}
	/>

	<button id="shorten" on:click={shorten} disabled={processing}>
		{#if processing}
			<span class="spinner"><IconSpinner /></span>
		{:else}
			Shorten!
		{/if}
	</button>
</div>

{#if error}
	<ErrorDisplay {error} />
{/if}

{#if showAdvanced}
	<div
		id="advanced"
		in:fade={{ duration: 200 }}
		out:fly={{ x: -10, duration: 300 }}
	>
		<h2>Advanced options</h2>
	</div>
{/if}

<style lang="less">
	#main {
		display: flex;
		height: 2.5rem;
		margin-bottom: 1rem;
		border: none;

		& :first-child {
			border-radius: 5px 0 0 5px;
		}

		& :not(:first-child, :last-child) {
			border-radius: 0;
		}

		& :last-child {
			border-radius: 0 5px 5px 0;
		}

		input {
			flex-grow: 1;
		}

		button {
			display: flex;
			align-items: center;
			padding: 0 10px;
			box-shadow: none;
			overflow-y: hidden;
		}
	}

	.spinner {
		animation: spinner_anim 500ms linear infinite;
	}

	@keyframes spinner_anim {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
