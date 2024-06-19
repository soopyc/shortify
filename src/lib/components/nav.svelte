<script lang="ts">
    import Navlink from "./navlink.svelte";
    import { env } from "$env/dynamic/public";

    export const app_version = APP_VER
    export const app_name = env.PUB_APP_NAME;
</script>

<nav>
    <div id="branding" class="colToRow">
        <a href="/">
            <img class:invert={env.PUB_MONOCHROME_ICON} id="banner" src="/banner.png" alt="Banner for this website, {app_name}"/>
        </a>
        <span>v{app_version}</span>
    </div>

    <div id="links" class="colToRow">
        <Navlink name="Home" href="/" />
        <Navlink name="Docs" href="/docs" />
        <Navlink name="About" href="/about" />
    </div>
</nav>

<style lang="less">
	@import "$lib/globals";
	
    nav {
        font-size: 1rem;
        margin: 1rem 0;

        display: flex;
        align-items: center;
        justify-content: space-around;
    }

	.colToRow {
		display: grid;
		align-items: end;
		justify-items: center;
		gap: 0.5em;
		grid-auto-flow: column;
		
		@media screen and (max-width: @mobile-breakpoint) {
			justify-items:end;
			grid-auto-flow: unset;
			grid-auto-columns: minmax(auto, 8em);
		}
	}

    #banner {
        height: 3em;
    }

    .invert {
        @media (prefers-color-scheme: light) {
            filter: none;
        };
        @media (prefers-color-scheme: dark) {
            filter: invert(1);
        }
    }
</style>
