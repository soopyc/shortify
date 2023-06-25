<script type="ts">
    import { session } from "$app/stores";
    import { browser } from "$app/env";

    // export let shortenedLinks: import("$lib/types/shortlink").localShortlink[] = [];
    export const pkg = $session.pkg;

    if (browser) {
        // console.log(shortenedLinks)
    }
</script>

<svelte:head>
    <title>Linkify v{pkg.version}</title>
</svelte:head>

<div>
    <div class="input-group mb-3">
        <input
            id="newLink"
            type="url"
            class="w-auto form-control"
            placeholder="https://longlink.co.uk.gov.hk.tk/"
        />
        <button type="button" class="btn btn-primary">Shorten</button>
    </div>

    <!-- Policy reminder -->
    <div class="form-text mb-2">
        <i class="bi bi-info-circle-fill"></i>
        By shortening a link you agree to the <a href="/terms#usage">usage policy</a>
    </div>

    <div class="m-2 mt-3">
        <!-- display previously shortened links from localStorage -->

        <!-- svelte-ignore missing-declaration -->
        <button on:click={fdsugeh94.a323}>Initiate crash</button>
    </div>
</div>
