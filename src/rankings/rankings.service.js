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
          COALESCE(SUM(p.points_classic) + SUM(p.points_risk), 0) AS total_score,
          SUM(CASE WHEN p IS NULL THEN 0 ELSE 1 END) as nb_predictions,
          SUM(CASE WHEN p.points_classic + p.points_risk = 8 THEN 1 ELSE 0 END) as nb_perfects
      FROM
          hp_user_in_group AS uga
          INNER JOIN hp_user_in_group AS ugb ON uga.group_id = ugb.group_id
          INNER JOIN hp_user AS u ON ugb.user_id = u.id
          LEFT JOIN hp_prediction AS p ON u.id = p.user_id
      WHERE
          uga.user_id = ${userId}
          AND uga.group_id = ${groupId}
          AND uga.is_active = true
          AND ugb.is_active = true
      GROUP BY
          u.id
      ORDER BY
          total_score DESC, nb_perfects DESC, nb_predictions DESC, name
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
          u.id as user_id,
          u.name AS user_name,
          u.anonymous_name,
          u.avatar_url,
          u.is_anonymous,
          COALESCE(SUM(p.points_classic) + SUM(p.points_risk), 0) AS total_score,
          SUM(CASE WHEN p IS NULL THEN 0 ELSE 1 END) as nb_predictions,
          SUM(CASE WHEN p.points_classic + p.points_risk = 8 THEN 1 ELSE 0 END) as nb_perfects
      FROM
          hp_user AS u
          LEFT JOIN hp_prediction AS p ON u.id = p.user_id
      GROUP BY
          u.id
      ORDER BY
          total_score DESC, nb_perfects DESC, nb_predictions DESC, u.name
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
      stats: {
        totalScore: userToRank.totalScore,
        nbPredictions: userToRank.nbPredictions,
        nbPerfects: userToRank.nbPerfects,
      },
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
