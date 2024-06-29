<script lang="ts">
	import { page } from "$app/stores";
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";
</script>

<svelte:head>
	<title>{makeTitle("Error")}</title>
</svelte:head>

{#if $page.status == 404}
	<Heading>404 Not found</Heading>

	<p>
		The server could not triangulate the correct address based on the provided
		information. Please check if you have entered the URL correctly, and contact
		the link provider directly.
	</p>
	<p>Not what you expected? Here's some data to dump to the site admin.</p>
{:else}
	<Heading>Error {$page.status}</Heading>

	<p>Something might have gone wrong if you managed to see this page.</p>
	<p>
		You should contact the site admin and provide the following information, and
		what you were doing prior to this error.
	</p>
{/if}

<pre class="mt-4 select-all text-light-red dark:text-dark-red">{$page.error?.message}</pre>
