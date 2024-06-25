<script>
	import { page } from "$app/stores";
	export let href;
	export let name;
</script>

<a {href} class="underline" class:underline-dotted={$page.url.pathname == href}>
	{name}
</a>
