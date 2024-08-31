<script>
	import Link from "./link.svelte";

	export let user;
</script>

<div>
	{#if user}
		{user.username} <Link href="/auth/logout">Logout</Link>
	{:else}
		<Link href="/auth/github">Login</Link>
	{/if}
</div>
