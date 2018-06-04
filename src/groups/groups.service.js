'use strict';

const database = require('../database-pool');
const sql = require('sql-tag');

// Reads a user's specific group (in which s.he's active)
// Returns active users count
function getGroup (userId, groupId) {

  const sqlQuery = sql`
      SELECT
          g.id,
          g.name,
          g.avatar_url,
          count(ugb) AS user_count
      FROM
          hp_user_in_group AS uga
          INNER JOIN Public.hp_group AS g ON uga.group_id = g.id
          INNER JOIN hp_user_in_group AS ugb ON g.id = ugb.group_id
      WHERE
          uga.user_id = ${userId}
          AND uga.group_id = ${groupId}
          AND uga.is_active = true
          AND ugb.is_active = true
      GROUP BY
          g.id,
          uga.is_admin
`;

  return database.one(sqlQuery);
}

module.exports = {
  getGroup,
};
