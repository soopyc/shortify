// TODO: rate limiting

/**
 * // FIXME: disallow recursive links to own domain
 *
 * Regardless of success status:
 *      check current user ratelimit bucket
 *      return headers: {
 *          X-Ratelimit-Limit: config.ratelimit.maxReq  // max usable tokens
 *          X-Ratelimit-Remaining: <ratelimit.get(IP)>.tokens  // remaining usable tokens
 *          X-Ratelimit-Reset: <ratelimit.get(IP)>.ts + (config.ratelimit.period * 1e3)  // reset timestamp
 *          X-Ratelimit-ResetAfter: ([X-Ratelimit-Reset]) - new Date()  // in ms
 *      }
 *
 * Success:
 *      remove 1 from <ratelimit.get(IP)>.tokens
 *      return HTTP 201,
 *      header: {Location: "the shortened link with domain", ...},
 *      body: {success: true, token: "generated token"}
 *
 * Failures:
 *   - rate limiting: return HTTP 429 with
 *       body: {success: false, reason: "rate limited", retry_after: [X-Ratelimit-ResetAfter]}
 *   - recursive links (s.d.tld/link1 -> s.d.tld/link2 -> ... ): return HTTP 400 with
 *       body: {success: false, reason: "links to this domain is not allowed."}
 *
 *   - unknown error: return HTTP 500 with
 *       body: {success: false, reason: 'unknown error'}
 */
export {}
