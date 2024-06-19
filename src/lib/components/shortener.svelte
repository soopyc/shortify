<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { UnimplementedError } from "$lib/errors";
	import {
		type ErrorType,
		type AdvancedConfiguration,
		ShortlinkModes,
	} from "$lib/types";

	// Components
	import ErrorDisplay from "$lib/components/errorDisplay.svelte";

	// Icons
	import IconSpinner from "~icons/gg/spinner";
	import IconMenu from "~icons/octicon/three-bars-16";
	import IconX from "~icons/octicon/x-12";
	import IconInfo from "~icons/octicon/info-16";

	export function toggleAdvanced() {
		showAdvanced = !showAdvanced;
	}

	export function prependProtocol() {
		if (inputUrl.match(/^(?!\w+:).+$/)) {
			inputUrl = "https://" + inputUrl;
		}
	}

	export async function shorten() {
		processing = true;
		error = undefined;
		try {
			const _ = new URL(inputUrl);
			// arbitrary delay
			await new Promise((resolve) => {
				setTimeout(() => resolve(null), 2500);
			});
			throw new UnimplementedError();
		} catch (e: any) {
			error = e;
		} finally {
			processing = false;
		}
	}

	// State
	export const advancedConfig: AdvancedConfiguration = {
		shortlinkMode: ShortlinkModes.Random,
	}; // TODO
	export let showAdvanced = false;
	export let inputUrl = "";
	export let processing: boolean = false;
	export let error: ErrorType = undefined;
</script>

<form id="shortener" method="post" on:submit|preventDefault={shorten}>
	<!-- TODO: Figure out how to unjs this later -->
	<div id="content">
		<button
			on:click={toggleAdvanced}
			type="button"
			title="Show advanced settings"
		>
			{#if !showAdvanced}
				<IconMenu />
			{:else}
				<IconX />
			{/if}
		</button>
		<input
			type="url"
			placeholder="Enter or paste in a URL..."
			contenteditable="true"
			disabled={processing}
			on:keydown={() => {
				error = undefined;
			}}
			on:change={prependProtocol}
			bind:value={inputUrl}
		/>
		<button id="shorten" disabled={processing} type="submit">
			{#if processing}
				<span class="spinner"><IconSpinner /></span>
			{:else}
				<span>Shorten!</span>
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
			<p><IconInfo /> Information entered will not be saved if this is closed.</p>
		</div>
	{/if}
</form>

<style lang="less">
	input {
		padding: 0 10px 0;
		border-color: inherit;
		border-width: 2px;
		border-style: solid;
	}

	#content {
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
			color: var(--primary);
			background-color: var(--secondary);
			border-color: var(--primary);

			&:disabled {
				background-color: var(--secondary-muted);
				border-color: var(--primary-muted);
				cursor: not-allowed;
			}
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
