'use strict';

const sql = require('sql-tag');
const database = require('../database-pool');
const generateAnonymousName = require('./anonymous-name-generator');


// Creates a new user or just update his/her last_connection_at date
// Used during login phase
function connectUser({ name, oauthHash, avatarUrl }) {

  const sqlQuery = sql`
    INSERT INTO Public.hp_user (name, anonymous_name, oauth_hash, avatar_url)
    VALUES (${name}, ${generateAnonymousName()}, ${oauthHash}, ${avatarUrl})
    ON CONFLICT (oauth_hash)
    DO UPDATE
    SET
        updated_at = now(),
        last_connection_at = now()
    RETURNING
        id,
        name,
        anonymous_name,
        avatar_url,
        is_anonymous
`;

  return database.one(sqlQuery);
}


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

// Reads a user's groups (in which s.he's active)
// Returns active users count for each group
function getUserGroups(userId) {

  const sqlQuery = sql`
      SELECT
          g.id,
          g.name,
          g.avatar_url,
          uga.is_admin,
          count(ugb) AS user_count
      FROM
          hp_user_in_group AS uga
          INNER JOIN Public.hp_group AS g ON uga.group_id = g.id
          INNER JOIN hp_user_in_group AS ugb ON g.id = ugb.group_id
      WHERE
          uga.user_id = ${userId}
          AND uga.is_active = true
          AND ugb.is_active = true
      GROUP BY
          g.id,
          uga.is_admin
      ORDER BY
          lower(g.name)
`;

  return database.many(sqlQuery)
}


module.exports = {
  connectUser,
  getUser,
  getUserGroups,
};
