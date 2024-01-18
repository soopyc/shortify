<script lang="ts">
    import Nav from "$lib/components/nav.svelte";
    import { trueish } from "$lib/trueish";
    import { env } from "$env/dynamic/public";

    import '@fontsource/comic-mono/400.css';
    import '@fontsource/comic-mono/700.css';
    import './app.less';
</script>

<div id="main">
    <Nav />

    <slot />
</div>

<div>
    {#if trueish(env.PUB_ENABLE_JOHN) && env.PUB_DOMAIN}
        <iframe
                id="john"
                src="https://john.citrons.xyz/embed?ref={env.PUB_DOMAIN}"
                title="johnvertisement"
        />
    {/if}
</div>

<style lang="less">
    :root {
        font-family: 'Comic Mono', monospace;
    }

    #main {
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
    }

    #john {
        margin-left: auto;
        display: block;
        margin-right: auto;
        max-width: 732px;
        width: 100%;
        height: 94px;
        border: none;
    }
</style>
