<script>
    import Nav from '$lib/nav.svelte';
	import { trueish } from '$lib/trueish';
	import {PUB_ENABLE_JOHN, PUB_DOMAIN} from '$env/static/public';

    export let data;
</script>

<div id="nav">
	<Nav app_color={data.app_color} />
</div>

<div class="main">
	<slot />
</div>

<div class="footer">
    <hr />
	{#if trueish(PUB_ENABLE_JOHN) && PUB_DOMAIN}
		<iframe
			class="john"
			src="https://john.citrons.xyz/embed?ref={PUB_DOMAIN}"
			title="johnvertisement"
		/>
	{/if}
</div>

<style>
	:global(a) {
		--link: #2b81e4;
		color: var(--link);
		transition-property: background-color color;
		transition-duration: 0.125s;
	}

	:global(a:hover, a:focus) {
		color: #fff;
		background-color: var(--link);
	}

    hr {
        all: revert;
    }

	#nav {
		padding-bottom: 1rem;
	}

	.main,
	.footer {
		max-width: 38rem;
		padding: 0 0 0 0;
		margin: auto;
		font-family: monospace;
	}

	.john {
		margin-left: auto;
		display: block;
		margin-right: auto;
		max-width: 732px;
		width: 100%;
		height: 94px;
		border: none;
	}
</style>
