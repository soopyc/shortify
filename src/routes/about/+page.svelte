<script>
	import { makeTitle } from "$lib";
	import Heading from "$lib/components/heading.svelte";
	import Link from "$lib/components/link.svelte";
</script>
<svelte:head>
	<title>{makeTitle("About")}</title>
</svelte:head>

<Heading>About</Heading>

<p>Shortify is a straightforward and easy-to-use link shortening service, designed to be self-hostable.</p>
<p>The source code is available at <Link href="//patchy.soopy.moe/cassie/shortify">https://patchy.soopy.moe/cassie/shortify</Link></p>
