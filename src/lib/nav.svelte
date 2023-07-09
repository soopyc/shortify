<script lang="ts">
	import { PUB_GIT_REPO } from '$env/static/public';
	import NavLink from './navLink.svelte';
	
	export let app_color: String = "#000000";
</script>

<div class="nav" style="--app-color: {app_color}">
	<div>
		<a id="app_name" href="/">Linkify</a>
		<!-- svelte-ignore missing-declaration -->
		<a id="app_version" href="{PUB_GIT_REPO}/commit/{APP_COMMIT}">{APP_VER}</a>
	</div>

	<div id="nav_links">
		<NavLink href="/" >Home</NavLink>
		<NavLink href="/api">Docs</NavLink>
	</div>
</div>

<style>
	.nav {
		max-width: 42rem;
		margin: 1rem auto 0rem;
		font-size: 1.5rem;
		font-family: monospace;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	:global(.current-page) {
		color: #fff;
		background-color: rgb(248, 52, 199);
	}

	#app_name {
		transition-property: background-color color;
		transition-duration: 0.125s;
		text-decoration: none;
		background-color: var(--app-color);
		color: #000;
		padding: 0 0.5em 0;
	}

	#app_name:hover {
		background-color: #00000000
	}

	#app_version {
		transition-property: background-color color;
		transition-duration: 0.125s;
		color: gray;
		font-size: 1rem;
	}

	#app_version:hover {
		background-color: gray;
		color: white;
	}

	#nav_links {
		font-size: 0.75em;
		text-align: center;
	}
</style>
