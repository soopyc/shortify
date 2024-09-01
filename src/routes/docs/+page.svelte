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
	<p>
		Base URL:
		<Code selectable={true}>
			{$page.url.protocol + "//" + $page.url.host}
		</Code>
	</p>
</div>

<div>
	<Heading level={2} id="get-S"><Code>GET /</Code></Heading>
	<p>You will get an HTML render of the main page.</p>
</div>

<div>
	<Heading level={2} id="post-S"><Code>POST /</Code></Heading>
	<p>Create a shortlink easily. The redaction token is provided in headers.</p>
	<p>Body: (string) the long link.</p>
	<p>Returns: (string) full shortlink url</p>
</div>

<div>
	<Heading level={2} id="get-api-link"><Code>GET /api/link</Code></Heading>
	<p>Get what the server knows about a shortlink.</p>
	<Heading level={3}>Query params:</Heading>
	<ul class="list-disc list-inside">
		<li><i>id:</i> shortlink id (the shortlink part of the full uri)</li>
	</ul>

	<Heading level={3}>Returns: (object)</Heading>
	<ul class="list-disc list-inside">
		<li><i>id:</i> the shortlink id</li>
		<li><i>to:</i> the destination url</li>
	</ul>
</div>

<div>
	<Heading level={2} id="post-api-link"><Code>POST /api/link</Code></Heading>
	<p>Make a new shortlink with custom parameters.</p>
	<Heading level={3}>Body (object):</Heading>
	<ul class="list-disc list-inside">
		<li><i>longLink: (string)</i> the long link to be shortened</li>
		<li><i>customLink: (string | undefined)</i> a custom shortlink to use</li>
		<li>
			<i>length: (number | undefined)</i> the length of the generated shortlink
		</li>
	</ul>

	<Heading level={3}>Returns: (object)</Heading>
	<ul class="list-disc list-inside">
		<li><i>shortId:</i> the shortlink id</li>
		<li><i>shortlink:</i> the full shortened url</li>
		<li><i>key:</i> token to redact the shortlink</li>
	</ul>
</div>

<div>
	<Heading level={2} id="post-api-link"><Code>DELETE /api/link</Code></Heading>
	<p>
		Delete a shortlink with a provided token. This redacts the destination
		address so the shortlink id cannot be reused.
	</p>
	<p>Requires authentication.</p>
	<Heading level={3}>Headers</Heading>
	<ul class="list-disc list-inside">
		<li><i>Authorization:</i> authorization token, provided upon link creation</li>
	</ul>
	<Heading level={3}>Body (object):</Heading>
	<ul class="list-disc list-inside">
		<li><i>id: (string)</i> the short link to be redacted</li>
	</ul>
</div>
