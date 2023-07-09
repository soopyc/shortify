<script lang="ts">
    import { page } from "$app/stores";

    export let href: string;
    export let activeClass: string = 'current-page';
</script>

<a {href} class={$page.url.pathname == href ? activeClass : ''}>
    <slot />
</a>
