<script>
	import { makeTitle } from "$lib";
	import { trueish } from "$lib/trueish";
	import { PUB_AUTH } from "$env/static/public";
	import Heading from "$lib/components/heading.svelte";
	import Link from "$lib/components/link.svelte";
</script>

<svelte:head>
	<title>{makeTitle("About")}</title>
</svelte:head>

<Heading>About</Heading>

<p>
	Shortify is a straightforward and easy-to-use link shortening service,
	designed to be self-hostable.
</p>
<p>
	The source code is available at <Link
		href="//patchy.soopy.moe/cassie/shortify"
		>https://patchy.soopy.moe/cassie/shortify</Link
	>
</p>

{#if trueish(PUB_AUTH)}
	<Heading level="2">Privacy</Heading>
	<p>This app uses some publicly available information via OAuth to operate.</p>
	<p>
		Data used are only for authentication purposes and no logs with user data
		are stored.
	</p>
	<p class="mb-3">These will only be fetched if you choose to login.</p>
	<p>List of data stored and used:</p>
	<ul class="list-disc list-inside">
		<li>GitHub Username</li>
		<li>GitHub User ID</li>
	</ul>
	<p>Please contact the site admin for data requests.</p>
{/if}
