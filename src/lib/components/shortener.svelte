<script lang="ts">
    import octicons from "@primer/octicons";
    import { fade, fly } from "svelte/transition";

    enum ShortlinkModes {
        Random = "random",
        Manual = "manual",
    }

    interface AdvancedInterface {
        shortlinkMode: ShortlinkModes
    }

    export let advancedConfig: AdvancedInterface = {
        shortlinkMode: ShortlinkModes.Random,
    };
    export let showAdvanced = false;
    export let shortenUrl = "";
    export let processing: boolean = false;
    export let error: Error | TypeError | undefined = undefined;

    export function toggleAdvanced() {
        showAdvanced = !showAdvanced;
    }

    export function shorten() {
        processing = true;
        error = undefined;
        try {
            const _ = new URL(shortenUrl);
            throw new Error("error")
        } catch (e: any) {
            error = e;
        } finally {
            processing = false;
        }
    }
</script>

<div id="main">
    <!-- Figure out how to unjs this later -->
    <button on:click={toggleAdvanced}>
        {#if !showAdvanced}
            {@html octicons["three-bars"].toSVG()}
        {:else}
            {@html octicons["x"].toSVG()}
        {/if}
    </button>

    <input type="text" placeholder="Enter or paste in a URL..." contenteditable="true" on:keydown={() => {error = undefined;}} bind:value={shortenUrl}/>

    <button id="shorten" on:click={shorten} disabled={processing}>
        {#if processing}
            <span class="spinner">{@html octicons["issue-draft"].toSVG()}</span>
        {:else}
            Shorten!
        {/if}
    </button>
</div>

{#if error}
    <div id="error" transition:fade={{duration: 250}}>
        <span id="error_icon">{@html octicons["alert-fill"].toSVG()}</span>
        <span>
            {#if error?.name == "TypeError"}
                The entered string is not a valid URL.
            {:else}
                An unknown error occurred: {error}
            {/if}
        </span>
    </div>
{/if}

{#if showAdvanced}
    <div id="advanced" in:fade={{duration: 200}} out:fly={{x: -10, duration: 300}}>
        <h2>Advanced options</h2>

    </div>
{/if}

<style lang="less">
    #main {
        display: flex;
        height: 2.5rem;
        margin-bottom: 1rem;
        border: none;

        & :first-child {
            border-radius: 5px 0 0 5px;
        }

        & :not(:first-child, :last-child) {
            border-radius: 0;
        }

        & :last-child {
            border-radius: 0 5px 5px 0;
        }

        
        input {
            flex-grow: 1;
        }

        button {
            display: flex;
            align-items: center;
            padding: 0 10px;
            box-shadow: none;
            overflow-y: hidden;
        }
    }

    #error {
        color: var(--red);
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: 1rem auto;
        align-items: center;
        column-gap: 5%;

        #error_icon {
            // TODO: figure out how to center this
            justify-self: end;
        }
    }

    .spinner {
        animation: spinner_anim 500ms linear infinite;
    }

    @keyframes spinner_anim {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
