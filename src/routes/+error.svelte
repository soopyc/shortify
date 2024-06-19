<script lang="ts">
	import { page } from "$app/stores";
	import { makeTitle } from "$lib";
</script>

<svelte:head>
	<title>{makeTitle("Error")}</title>
</svelte:head>

{#if $page.status == 404}
	<h1>404 Not found</h1>
	<p>
		The server could not triangulate the correct address based on the provided information.
		Please check if you have entered the URL correctly. Contact the link provider.
	</p>
{:else}
	<h1>Error {$page.status}</h1>

	<p>Something might have gone wrong if you managed to see this page.</p>
	<p>You should contact the site admin and provide the following information.</p>
{/if}

<p>Not what you expected? Here's some data to dump to the site admin.</p>
<pre>{$page.error?.message}</pre>
