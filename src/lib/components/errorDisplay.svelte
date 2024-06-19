<script lang="ts">
	import IconAlertFill from "~icons/octicon/alert-fill-16";
	import { fade } from "svelte/transition";
	import type { ErrorType } from "$lib/types";

	export let error: ErrorType;
</script>

<div id="error" transition:fade={{ duration: 150 }}>
	<span id="error_icon"><IconAlertFill /></span>
	<span>
		{#if error?.name == "TypeError"}
			The entered string is not a valid URL.
		{:else}
			An unknown error occurred. <br />
			{error}
		{/if}
	</span>
</div>

<style lang="less">
	#error {
		color: var(--red);
		margin-bottom: 10px;
		display: grid;
		grid-template-columns: 1rem auto;
		align-items: center;
		column-gap: 0.5em;

		#error_icon {
			align-self: center;
			justify-self: center;
		}
	}
</style>
