<script>
	import { PUB_APP_NAME, PUB_AUTH } from "$env/static/public";
	import { trueish } from "$lib/trueish";
	import Navlink from "./navlink.svelte";
	import User from "./user.svelte";

    export const app_version = APP_VER // @eslint-silent-error this is defined in app.d.ts.
	export let user;
</script>

<div class="flex flex-auto place-content-between">
	<div id="app_name">
		<span>{PUB_APP_NAME}</span>
		<span>v{app_version}</span>
	</div>

	{#if trueish(PUB_AUTH)}
		<User {user} />
	{/if}
</div>

<div id="links" class="mt-2 flex gap-2 justify-end">
	<Navlink name="Home" href="/" />
	<Navlink name="Docs" href="/docs" />
	<Navlink name="About" href="/about" />
</div>
