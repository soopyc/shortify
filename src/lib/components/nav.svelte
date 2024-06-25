<script>
	import { PUB_APP_NAME } from "$env/static/public";
	import Navlink from "./navlink.svelte";

    export const app_version = APP_VER // @eslint-silent-error this is defined in app.d.ts.
</script>

<div class="flex flex-auto place-content-between">
	<div id="app_name">
		<span>{PUB_APP_NAME}</span>
		<span>v{app_version}</span>
	</div>

	<div id="login">
		<span>Log in</span>
	</div>
</div>

<div id="links" class="mt-2 flex gap-2 justify-end">
	<Navlink name="Home" href="/" />
	<Navlink name="Docs" href="/docs" />
	<Navlink name="About" href="/about" />
</div>
