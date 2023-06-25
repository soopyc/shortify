<script context="module" lang="ts">
    export const load: import('@sveltejs/kit').Load = ({error, status}) => {
        return {
            props: {
                loadError: error,
                loadErrorStatus: status
            }
        }
    }
</script>

<script lang="ts">
    export let loadError: Error;
    export let loadErrorStatus: number | null;

    export const errorStack = loadError.stack
</script>

<h1>{loadErrorStatus}</h1>
<pre class="pb-3">
{loadError.name}: {loadError.message}

{#if errorStack}
{errorStack}
{/if}
</pre>
