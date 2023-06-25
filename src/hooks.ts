import config from "config";
import "@sentry/tracing";
import Sentry from "@sentry/node";
import pkg_json from '../package.json';

if (config.get('site.dsn')) {
    Sentry.init({
        dsn: config.get('site.dsn'),
        release: `${pkg_json.name}@${pkg_json.version}`,
        environment: process.env.NODE_ENV ?? "development",
        initialScope: {
            tags: {
                target: "backend"
            }
        }
    })
}

export const getSession: import('@sveltejs/kit').GetSession = () => {
    return {
        pkg: pkg_json,
        // sentryDSN: config.get("site.dsn")
        sentryDSN: null
    }
}

export const handleError: import('@sveltejs/kit').HandleError = ({error, event}) => {
    // @ts-ignore: bruh.
    Sentry.captureException(error, { event });
}
