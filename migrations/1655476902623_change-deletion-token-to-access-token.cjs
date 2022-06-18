/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.renameColumn('links', 'deletionToken', 'accessToken')
};
