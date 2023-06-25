/**
 * // TODO
 * Rate limit handler thing
 * - token bucket
 * - use redis for storing buckets
 * - e.g. linkify:rate:CLIENT_IP_ADDRESS -> {ts: timestamp, tokens: 60}
 *   where     ts = creation/refill unix mills
 *         tokens = amount of tokens in the current bucket
 */

export {}
