'use strict';

const database = require('../database-pool');
const sql = require('sql-tag');
const { addSlug } = require('../utils/add-slug');

// Create a group (in which the user will be the first active and admin member)
// Returns the created group
function createGroup (userId, { name, avatarUrl }) {

  const sqlQuery = sql`
      WITH g AS (
          INSERT INTO hp_group (name, avatar_url)
          VALUES (${name}, ${avatarUrl})
          RETURNING id, name, avatar_url
      ),
      ug AS (
          INSERT INTO hp_user_in_group (user_id, group_id, is_admin, is_active)
          SELECT ${userId}, g.id, true, true
          FROM g
      )
      SELECT
          id,
          name,
          avatar_url,
          true AS is_admin,
          1 AS user_count
      FROM g
`;

  return database.one(sqlQuery)
    .then((group) => addSlug(group));
}

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
          INNER JOIN hp_group AS g ON uga.group_id = g.id
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

  return database.one(sqlQuery)
    .then((group) => addSlug(group));
}

// Update group details
// User needs to be admin of the group
// Returns the edited group
function updateGroup (userId, groupId, { name, avatarUrl }) {

  const sqlQuery = sql`
      UPDATE
          hp_group
      SET
          updated_at = now(),
          name = ${name},
          avatar_url = ${avatarUrl}
      FROM
          hp_user_in_group AS ug
      WHERE
          id = ug.group_id
          AND ug.user_id = ${userId}
          AND ug.group_id = ${groupId}
          AND ug.is_admin = true
      RETURNING
          id,
          name,
          avatar_url
`;

  return database.one(sqlQuery)
    .then((group) => addSlug(group));
}

module.exports = {
  createGroup,
  getGroup,
  updateGroup,
};
