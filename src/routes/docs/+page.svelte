<script>
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>API Documentation | Shortify</title>
</svelte:head>

<!-- we will move to a versioned api sooner or later, but this is what we have for now. -->
<h1>API Documentation</h1>
<div>
	<p>Base URL: <code class="copy">{$page.url.protocol + "//" + $page.url.host}</code></p>
	<p>You did not read that wrong, there is no <code>/api/v1</code> stuff</p>
</div>

<div>
	<h2 id="get-S"><code>GET /</code></h2>
	<p>You will get an HTML render of the main page.</p>
</div>

<h2><code>GET /check</code></h2>

<style lang="less">
	.copy {
		user-select: all;
	}
	div > p {
		margin-top: 0.15em;
		margin-bottom: 0.15em;
	}

	code {
		background-color: rgba(235, 235, 235, 0.733);
		color: rgb(204, 54, 104);
		padding: 0 0.5em 0;
	}

	h2 {
		margin-bottom: 0.25em;
	}
</style>
