<script lang="ts">
	import { getLogger } from "$lib/logging";
	import Shortener from "$lib/components/shortener.svelte";
	import type { AdvancedConfiguration } from "$lib/types";
	import type { Snapshot } from "./$types";
	import { ShortlinkModes } from "$lib/types";
	import { makeTitle } from "$lib";
	
	const logger = getLogger("index")

	interface SnapshotData {
		advancedConfig: AdvancedConfiguration;
		inputUrl: string;
	}

	export const snapshot: Snapshot<SnapshotData> = {
		capture: (): SnapshotData => {
			const a = { advancedConfig, inputUrl, }
			logger.info("stored data", a)
			return a
		},
		restore: (snapshot: SnapshotData): void => {
			logger.info("restored data", snapshot);
			({ advancedConfig, inputUrl } = snapshot);
		},
	};

	// state
	export let inputUrl: string
	export let advancedConfig: AdvancedConfiguration = {
		shortlinkMode: ShortlinkModes.Random,
	};
</script>

<svelte:head>
	<title>{makeTitle()}</title>
</svelte:head>

<Shortener {advancedConfig} {inputUrl} />
