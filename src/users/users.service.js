'use strict';

const sql = require('sql-tag');
const database = require('../database-pool');


// Reads user details
// Used when loading the application (and during login phase)
function getUser(id) {

  const sqlQuery = sql`
      SELECT
          id,
          name,
          anonymous_name,
          avatar_url,
          is_anonymous
      FROM
          Public.hp_user
      WHERE
          id = ${id}
`;

  return database.one(sqlQuery);
}

module.exports = {
  getUser,
};
