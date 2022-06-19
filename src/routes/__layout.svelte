<script lang="ts">
    import "../app.sass";
    import { dev } from "$app/env";
    import { session } from "$app/stores";
    export const pkg = $session.pkg;

    export const devMode = {
        color: dev ? "text-danger" : "text-success",
        text: dev ? "dev" : "prod",
    };

    // // @ts-ignore shut up typescirpt
    // export const pkg: any = JSON.parse(process.env.PACKAGE_JSON);
</script>

<nav class="app-nav">
    <p>
        <a href="/" class="text-reset">
            <span class="text-muted">Linkify</span>
        </a>
        <a href="//koakuma.soopy.moe/gensokyo/link-shortener" title="Source code repository" class="text-reset">
            <span class="text-primary">v{pkg.version}</span>
        </a>
        (<span class={devMode.color}>{devMode.text}</span>)
    </p>

    <div class="d-flex gap-3">
        <a href="/" class="text-reset text-decoration-none">Home</a>
        <a href="/terms" class="text-reset text-decoration-none">Terms</a>
    </div>
</nav>
<div class="app"><slot /></div>
