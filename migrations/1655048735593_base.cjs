/* eslint-disable camelcase */


exports.shorthands = undefined;

/**
 * ↓ doesn't even work
 * @param {import("node-pg-migrate").MigrationBuilder} pgm 
 */
exports.up = pgm => {
    pgm.createTable("links", {
        id: {type: "text"},
        shortened: {type: "text"},
        original: {type: "text"},
        deletionToken: {type: "text"},
        creationDate: {type: "timestamp"},
    })
};

exports.down = false
