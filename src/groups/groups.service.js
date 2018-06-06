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

// Deletes group
// User needs to be admin of the group
function deleteGroup (userId, groupId) {

  const sqlQuery = sql`
      DELETE FROM
          hp_group
      USING
          hp_user_in_group AS ug
      WHERE
          id = ug.group_id
          AND ug.user_id = ${userId}
          AND ug.group_id = ${groupId}
          AND ug.is_admin = true
`;

  return database.one(sqlQuery);
}

// Get members of a group
// User needs to be admin of the group
function getGroupMembers (userId, groupId) {

  const sqlQuery = sql`
      SELECT
          u.id,
          u.name,
          u.anonymous_name,
          u.avatar_url,
          u.is_anonymous,
          ugb.is_admin,
          ugb.is_active,
          ugb.created_at AS member_since
      FROM
          hp_user_in_group AS uga
          INNER JOIN hp_user_in_group AS ugb ON uga.group_id = ugb.group_id
          INNER JOIN hp_user AS u ON ugb.user_id = u.id
      WHERE
          uga.user_id = ${userId}
          AND uga.group_id = ${groupId}
          AND uga.is_admin = true
      ORDER BY
          is_admin DESC,
          member_since DESC
`;

  return database.many(sqlQuery);
}

// User joins a group
// User needs to have the "secret" id of the group
function addUserToGroup (userId, groupId) {

  const sqlQuery = sql`
      INSERT INTO hp_user_in_group (user_id, group_id, is_admin, is_active)
      VALUES (${userId}, ${groupId}, false, true)
      ON CONFLICT (user_id, group_id)
      DO NOTHING
`;

  return database.many(sqlQuery);
}

// Updates isActive status of a user in a group
// User needs to be admin of the group
function updateUserMembership (adminId, groupId, userId, { isActive }) {

  const sqlQuery = sql`
        UPDATE
            hp_user_in_group AS uga
        SET
            updated_at = now(),
            is_active = ${isActive}
        FROM
            hp_user_in_group AS ugb
        WHERE
            uga.user_id = ${userId}
            AND uga.group_id = ugb.group_id
            AND ugb.user_id = ${adminId}
            AND ugb.group_id = ${groupId}
            AND ugb.is_admin = true
`;

  return database.one(sqlQuery);
}

module.exports = {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  getGroupMembers,
  addUserToGroup,
  updateUserMembership,
};
