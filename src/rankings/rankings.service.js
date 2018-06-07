'use strict';

const database = require('../database-pool');
const sql = require('sql-tag');
const { addIdenticon } = require('../utils/add-identicon');

// Calculate the ranking for on group
function calculateGroupRanking ({ userId, groupId, page, pageSize }) {
  const sqlQuery = sql`
      SELECT
          u.id as user_id,
          u.name AS user_name,
          u.anonymous_name,
          u.avatar_url,
          u.is_anonymous,
          ugb.created_at AS member_since
      FROM
          hp_user_in_group AS uga
          INNER JOIN hp_user_in_group AS ugb ON uga.group_id = ugb.group_id
          INNER JOIN hp_user AS u ON ugb.user_id = u.id
      WHERE
          uga.user_id = ${userId}
          AND uga.group_id = ${groupId}
          AND uga.is_active = true
          AND ugb.is_active = true
      ORDER BY
          member_since, name
`;

  return database.many(sqlQuery)
    .then((userToRankList) => {
      return userToRankList.map(formatUserWithStats(false));
    })
    .then(calculateRankings)
    .then((ranking) => paginate(ranking, page, pageSize));
}

function calculateGeneralRanking ({ userId, page, pageSize }) {
  const sqlQuery = sql`
      SELECT
          id as user_id,
          name AS user_name,
          anonymous_name,
          avatar_url,
          is_anonymous
      FROM
          hp_user
      ORDER BY
          created_at, name
`;

  return database.many(sqlQuery)
    .then((userWithScoreList) => {
      return userWithScoreList.map(formatUserWithStats(true, userId));
    })
    .then(calculateRankings)
    .then((ranking) => paginate(ranking, page, pageSize));
}

function formatUserWithStats (isGeneral, userId) {
  return function (userToRank) {

    const isCurrentUser = userToRank.userId === userId;
    const shouldBeAnonymous = isGeneral && userToRank.isAnonymous && !isCurrentUser;

    const name = shouldBeAnonymous ? userToRank.anonymousName : userToRank.userName;
    const avatarUrl = shouldBeAnonymous ? null : userToRank.avatarUrl;

    return {
      user: addIdenticon({ id: userToRank.userId, name, avatarUrl }),
      stats: { totalScore: 0, nbPredictions: 0, nbPerfects: 0 },
    };
  };
}

function calculateRankings (userWithStatsList = []) {

  return userWithStatsList.reduce((rankings, userWithStats, idx) => {

    const { user, stats } = userWithStats;
    const previous = rankings[idx - 1];
    const rank = (previous != null && previous.stats.totalScore === stats.totalScore)
      ? previous.rank
      : idx + 1;

    return [...rankings, { user, stats, rank }];
  }, []);
}

function paginate (results = [], page, pageSize) {
  if (page === 0) {
    page = 1;
  }

  const from = pageSize * (page - 1);
  return results.slice(from, pageSize + from);
}

module.exports = {
  calculateGroupRanking,
  calculateGeneralRanking,
};
