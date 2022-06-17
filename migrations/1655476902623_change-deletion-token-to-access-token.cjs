/* eslint-disable camelcase */


exports.shorthands = undefined;

/**
 * ↓ doesn't even work
 * @param {import("node-pg-migrate").MigrationBuilder} pgm 
 */
exports.up = pgm => {
    pgm.renameColumn('links', 'deletionToken', 'accessToken')
};
