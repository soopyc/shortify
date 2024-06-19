<script lang="ts">
	import { page } from "$app/stores";
	export let name: string;
	export let href: string;
</script>

<a {href} class:current={$page.url.pathname == href}>
	{name}
</a>

<style lang="less">
	@import "$lib/globals";

	a {
		padding-top: 3px;
		padding-bottom: 1px;
		transition-property: padding, color, background-color;
		transition-duration: 250ms;

		// TODO: decide on whether we want this or not
		// @media screen and (max-width: @mobile-breakpoint) {
		@media (prefers-reduced-motion) {
			padding-right: 10px;
		}

		&:visited,
		&:active,
		& {
			color: unset; // var(--primary);
		}
		&:hover,
		&:focus,
		&.current {
			padding-left: 10px;
			padding-right: 10px;
			color: var(--secondary);
			background-color: var(--primary);
		}
	}
</style>
