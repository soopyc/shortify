<script lang="ts">
	import Nav from "$lib/components/nav.svelte";

	// fonts
	import "@fontsource/roboto-mono/400.css";
	import "@fontsource/roboto-mono/700.css";

	// styles
	import "@unocss/reset/tailwind.css";
	import "virtual:uno.css";
	import "./app.css";
</script>

<div id="main" class="lg:mx-a max-w-3xl mt-4 mx-4">
	<Nav />
	<slot />
</div>
