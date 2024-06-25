<script lang="ts">
    import Nav from "$lib/components/nav.svelte";
    import { trueish } from "$lib/trueish";
    import { env } from "$env/dynamic/public";

    import '@fontsource/comic-mono/400.css';
    import '@fontsource/comic-mono/700.css';
    import './app.less';
</script>

<div id="main">
	<Nav />
	<slot />
</div>
