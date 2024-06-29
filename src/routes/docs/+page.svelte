<script>
	import { page } from "$app/stores";
	import { makeTitle } from "$lib";
	import Code from "$lib/components/code.svelte";
	import Heading from "$lib/components/heading.svelte";
</script>

<svelte:head>
	<title>{makeTitle("API Documentation")}</title>
</svelte:head>

<!-- we will move to a versioned api sooner or later, but this is what we have for now. -->
<Heading>API Documentation</Heading>
<div>
	<p>Base URL: <Code selectable={true}>{$page.url.protocol + "//" + $page.url.host}</Code></p>
</div>

<div>
	<Heading level={2} id="get-S"><Code>GET /</Code></Heading>
	<p>You will get an HTML render of the main page.</p>
</div>

<div>
	<Heading level={2} id="post-S"><Code>POST /</Code></Heading>
	<p>Balls</p>
</div>

