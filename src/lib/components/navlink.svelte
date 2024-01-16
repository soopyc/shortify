<script lang="ts">
	import { page } from "$app/stores";
	export let name: string;
	export let href: string;
</script>

<a {href} class:current={$page.url.pathname == href}>
	{name}
</a>

<style lang="less">
	a {
		padding-top: 3px;
		padding-bottom: 1px;
		transition-property: padding, color, background-color;
		transition-duration: 250ms;

		&:visited,
		&:active,
		& {
			color: var(--primary);
		}
		&:hover,
		&:focus,
		&.current {
			padding: 3px 10px 3px;
			color: var(--secondary);
			background-color: var(--primary);
		}
	}
</style>
