<script>
    import { session, page } from "$app/stores";
    export const pkg = $session.pkg;

    export const sentryEnabled = $session.sentryDSN ? true : false;

    $: currentUrl = $page.url;
    $: section = new URL(currentUrl).hash;
</script>

<svelte:head>
    <title>Terms | Linkify v{pkg.version}</title>
</svelte:head>

<div>
    <h2>Terms and Policies</h2>
    <div>
        <h4>Contents</h4>
        <ul>
            <li><a href="#usage">Usage Policy</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
    </div>
    <div>
        <p>
            This is a <b>free</b> service and you are expected to not be a dick when
            using this link shortener.
        </p>
        <p>
            Source code for this site can be retrieved <a
                href="//koakuma.soopy.moe/gensokyo/link-shortener"
                target="_blank"
                rel="noreferrer">here</a
            >
        </p>
        <p>
            By submitting a link ("shortening" a link) you automatically agree
            to the privacy policy and the usage policy below.
        </p>
        <p>
            If you (attempt to) break or skirt the usage policy you are going to
            be banned.
        </p>
    </div>
    <div>
        <a id="usage">
            <h4
                class="{section === '#usage'
                    ? 'bg-warning'
                    : ''} transition-color"
            >
                Usage Policy (<a href="#top">top</a>)
            </h4>
        </a>
        <ol>
            <li>
                Do <b>not</b> create shortlinks to copyrighted content. YouTube links
                and such are fine, shortlinks to pirate/warez sites are not fine.
            </li>
            <li>
                Do <b>not</b> use offensive words in custom urls. This includes slurs
                and other terms that bring discomfort to users.
            </li>
            <li>
                Absolutely do <b>not</b> spam requests.
            </li>
        </ol>
    </div>

    <div>
        <a id="privacy">
            <h4
                class="{section === '#privacy'
                    ? 'bg-warning'
                    : ''} transition-color"
            >
                Privacy Policy (<a href="#top">top</a>)
            </h4>
        </a>
        <p>
            We collect a number of information in order to provide this service
            to you. Most of which are non-identifiable.
        </p>
        <!-- <p>
            <abbr title="personally identifiable information">PII</abbr>s (items
            with 🅿️ in this document) are only collected for abuse tracking and
            are only kept for a very limited time.
        </p> Help: Are IP addresses PII? -->
        <p>
            If you want your data to be removed, please contact the site owner
            at <a href="mailto:$CONTACT_EMAIL">$CONTACT_EMAIL</a>
        </p>

        {#if sentryEnabled}
            <b>Sentry</b>
            <p>
                This site has enabled sentry for error tracking. Sentry collects a variety of information.
                Please check their documentation for more information.
            </p>
            <p>This site by default does not collect any PII with sentry.</p>
        {/if}

        <b>Data stored for more than 30 days</b>
        <ul>
            <li>Link before shortening</li>
            <li>Shortened links</li>
            <li>modification tokens for the shortlink ids</li>
        </ul>

        <b>Data stored temporarily (less than 30 days)</b>
        <ul>
            <li>
                IP address
                <ul>
                    <li>Purpose: ratelimiting and abuse prevention</li>
                </ul>
            </li>
        </ul>

        <b>Data stored locally (in browser)</b>
        <ul>
            <li>Shortened links</li>
            <li>Modification token for the shortlink ids</li>
        </ul>
    </div>
</div>
