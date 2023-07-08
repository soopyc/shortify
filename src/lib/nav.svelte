<script lang="ts">
	import { PUB_GIT_REPO } from '$env/static/public';

	export let app_color: String;
</script>

<div class="nav">
	<div>
		<a id="app_name" style="color: {app_color}" href="/">Linkify</a>
		<!-- svelte-ignore missing-declaration -->
		<a id="app_version" href="{PUB_GIT_REPO}/commit/{APP_COMMIT}">{APP_VER}</a>
	</div>
</div>

<style>
	.nav {
		max-width: 42rem;
		margin: 1rem auto 0rem;
		font-size: 1.5rem;
		font-family: monospace;
		display: flex;
	}

	#app_version {
		color: gray;
		font-size: 1rem;
	}

	#app_version:hover {
		background-color: gray;
		color: white;
	}
</style>
