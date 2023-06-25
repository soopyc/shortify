<script lang="ts">
    import { BrowserTracing } from "@sentry/tracing";
    import * as Sentry from "@sentry/browser";
    import { session } from "$app/stores";
    import { browser } from "$app/env";
    export const pkg = $session.pkg;

    let eventId;
    if ($session.sentryDSN && browser) {
        Sentry.init({
            dsn: $session.sentryDSN,
            release: `${pkg.name}@${pkg.version}`,
            integrations: [new BrowserTracing()],
            environment: process.env.NODE_ENV ?? "development",
            initialScope: {
                tags: { target: "frontend" },
            },

            beforeSend(event) {
                eventId = event.event_id;
                return event;
            },
        });
        console.log("Sentry initalized");
    }
    import "../app.sass";
    import { dev } from "$app/env";
    export const devMode = {
        color: dev ? "text-danger" : "text-success",
        text: dev ? "dev" : "prod",
    };

    function setElementTextById(id: string, text: string) {
        // Thanks type script
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
        }
        return;
    }

    if (browser) {
        const errorHandler = document.getElementById("error-handler");
        let debounce = false;
        window.addEventListener("unhandledrejection", (event) => {
            errorHandler?.classList.remove("invisible", "d-none");
            setElementTextById("error-name", event.reason.toString());
            setElementTextById("error-stack", event.reason.stack);

            const reportButton = document.getElementById('error-report')
            const report = () => {
                // @ts-ignore: Typescript the element exists.
                reportButton.innerHTML = ""
                // summon screen
                console.log("Showing report dialog")
                Sentry.showReportDialog()
            }
            reportButton?.addEventListener('click', report)
            reportButton?.addEventListener('keydown', (event) => {
                if (debounce) return

                if (event.key == " " || event.key == "Enter") {
                    debounce = true
                    setTimeout(() => {
                        debounce = false;
                    }, 5000)

                    report()
                }
            })
        });
    }

    // // @ts-ignore shut up typescirpt
    // export const pkg: any = JSON.parse(process.env.PACKAGE_JSON);
</script>

<nav class="app-nav">
    <p>
        <a href="/" class="text-reset">
            <span class="text-muted">Linkify</span>
        </a>
        <a
            href="//koakuma.soopy.moe/gensokyo/link-shortener"
            title="Source code repository"
            class="text-reset"
        >
            <span class="text-primary">v{pkg.version}</span>
        </a>
        (<span class={devMode.color}>{devMode.text}</span>)
    </p>

    <div class="d-flex gap-3">
        <a href="/" class="text-reset text-decoration-none">Home</a>
        <a href="/terms" class="text-reset text-decoration-none">Terms</a>
    </div>
</nav>

<div class="app">
    <div id="error-handler" class="card mb-3 text-bg-danger invisible d-none">
        <div class="card-header fs-4">😵‍💫 Oops!</div>
        <div class="card-body">
            <div>
                <p id="error-name" class="rounded bg-dark text-white p-2 user-select-all">Error: ...</p>
                <p>
                    <button class="btn btn-primary block">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                    
                    <button class="btn btn-warning" id="error-report" title="Report error" disabled={$session.sentryDSN ? false : true}>
                        {#if $session.sentryDSN}
                            <i class="bi bi-flag-fill" id="error-report-icon"></i> Report error
                        {:else}
                            <i class="bi bi-x-circle-fill"></i> Crash report disabled
                        {/if}
                    </button>

                </p>

                <details class="my-2">
                    <summary>Error stack</summary>
                    <pre id="error-stack" class="user-select-all" />
                </details>
            </div>
            <hr>
            <i>The app below is likely not going to respond anymore.</i>
        </div>
    </div>

    <slot />
</div>
