'use strict';

const _ = require('lodash');
const database = require('../database-pool');
const generateAnonymousName = require('./anonymous-name-generator');
const moment = require('moment');
const sql = require('sql-tag');
const { addIdenticon } = require('../utils/add-identicon');
const { addSlug } = require('../utils/add-slug');

// Creates a new user or just update his/her last_connection_at date
// Used during login phase
function connectUser ({ name, oauthHash, avatarUrl }) {

  const anonymousName = generateAnonymousName();
  const sqlQuery = sql`
    INSERT INTO hp_user (name, anonymous_name, oauth_hash, avatar_url)
    VALUES (${name}, ${anonymousName}, ${oauthHash}, ${avatarUrl})
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

function getUserCount () {

  const sqlQuery = sql`SELECT count(*) FROM hp_user`;

  return database.one(sqlQuery);
}

// Reads user details
// Used when loading the application (and during login phase)
function getUser (id) {

  const sqlQuery = sql`
      SELECT
          id,
          name,
          anonymous_name,
          avatar_url,
          is_anonymous
      FROM
          hp_user
      WHERE
          id = ${id}
`;

  return database.one(sqlQuery);
}

// Updates user details
// Used in edit profile page
// Returns the edited user
function updateUser ({ id, name, avatarUrl, isAnonymous }) {

  const sqlQuery = sql`
      UPDATE
          hp_user
      SET
          updated_at = now(),
          name = ${name},
          avatar_url = ${avatarUrl},
          is_anonymous = ${isAnonymous}
      WHERE
          id = ${id}
      RETURNING
          id,
          name,
          anonymous_name,
          avatar_url,
          is_anonymous
`;

  return database.one(sqlQuery);
}

// Reads a user's groups (in which s.he's active)
// Returns active users count for each group
function getUserGroups (userId) {

  const sqlQuery = sql`
      SELECT
          g.id,
          g.name,
          g.avatar_url,
          uga.is_admin,
          count(ugb) AS user_count
      FROM
          hp_user_in_group AS uga
          INNER JOIN hp_group AS g ON uga.group_id = g.id
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
    .then((groups) => groups.map(addSlug).map(addIdenticon));
}

// Creates or updates a prediction for a user on a game
async function upsertPrediction ({ userId, gameId, predictionScoreTeamA, predictionScoreTeamB, predictionRiskAnswer, predictionRiskAmount }) {

  const gameSqlQuery = sql`
      SELECT starts_at
      FROM hp_game
      WHERE id = ${gameId}
  `;

  const game = await database.one(gameSqlQuery);
  if (!moment().isBefore(game.startsAt)) {
    throw new GameAlreadyBegunError(`Game ${gameId} has already begun`);
  }

  const upsertSqlQuery = sql`
      WITH g as (
          SELECT starts_at
          FROM hp_game
          WHERE id = ${gameId}
      ),
      p AS (
          INSERT INTO hp_prediction (risk_will_happen, risk_amount, user_id, game_id)
          VALUES (${predictionRiskAnswer}, ${predictionRiskAmount}, ${userId}, ${gameId})
          ON CONFLICT (user_id, game_id)
          DO UPDATE
          SET
              updated_at = now(),
              risk_will_happen = ${predictionRiskAnswer},
              risk_amount = ${predictionRiskAmount}
          RETURNING
              id,
              game_id,
              risk_will_happen,
              risk_amount
      ),
      upa AS (
          INSERT INTO hp_prediction_predicts_score_for_team (prediction_id, team_id, goal)
          VALUES (
              (SELECT id from p),
              (SELECT team_id
                  FROM hp_team_plays_in_game
                  WHERE game_id = ${gameId}
                  AND hp_team_plays_in_game.order = 1),
              ${predictionScoreTeamA}
          )
          ON CONFLICT (prediction_id, team_id)
          DO UPDATE
          SET
              updated_at = now(),
              goal = ${predictionScoreTeamA}
          RETURNING
              goal
      ),
      upb AS (
          INSERT INTO hp_prediction_predicts_score_for_team (prediction_id, team_id, goal)
          VALUES (
              (SELECT id from p),
              (SELECT team_id
                  FROM hp_team_plays_in_game
                  WHERE game_id = ${gameId}
                  AND hp_team_plays_in_game.order = 2),
              ${predictionScoreTeamB}
          )
          ON CONFLICT (prediction_id, team_id)
          DO UPDATE
          SET
              updated_at = now(),
              goal = ${predictionScoreTeamB}
          RETURNING
              goal
      )
      SELECT
          p.id,
          p.game_id,
          p.risk_will_happen AS prediction_risk_answer,
          p.risk_amount AS prediction_risk_amount,
          upa.goal AS prediction_score_team_a,
          upb.goal AS prediction_score_team_b
      FROM p, upa, upb
  `;

  return database.one(upsertSqlQuery);
}

// Get games with information and predictions
function getPredictions (userId, period) {

  const sqlQuery = sql`
      SELECT
          g.id                  AS game_id,
          g.phase               AS phase,
          g.city                AS city,
          g.name                AS game_name,
          g.stadium             AS stadium,
          g.starts_at           AS starts_at,
          g.risk_happened       AS risk_happened,
          ta.id                 AS id_team_a,
          tb.id                 AS id_team_b,
          tb.code               AS code_team_b,
          ta.code               AS code_team_a,
          ta.name               AS name_team_a,
          tb.name               AS name_team_b,
          ta.group              AS group,
          tpga.goals            AS goals_team_a,
          tpgb.goals            AS goals_team_b,
          tpgb.penalties        AS penalties_team_b,
          tpga.penalties        AS penalties_team_a,
          r.id                  AS risk_id,
          r.text                AS risk_title,
          ppsta.goal            AS prediction_score_team_a,
          ppstb.goal            AS prediction_score_team_b,
          p.risk_will_happen    AS prediction_risk_answer,
          p.risk_amount         AS prediction_risk_amount,
          p.points_classic      AS classic_points,
          p.points_risk         AS risk_points
      FROM
          hp_game AS g
      INNER JOIN hp_team_plays_in_game AS tpga
          ON tpga.game_id = g.id AND tpga.order = 1
      INNER JOIN hp_team AS ta
          ON tpga.team_id = ta.id
      INNER JOIN hp_team_plays_in_game AS tpgb
          ON tpgb.game_id = g.id AND tpgb.order = 2
      INNER JOIN hp_team AS tb
          ON tpgb.team_id = tb.id
      LEFT JOIN hp_prediction AS p
          ON p.game_id = g.id AND p.user_id = ${userId}
      LEFT JOIN hp_prediction_predicts_score_for_team AS ppsta
          ON ppsta.prediction_id = p.id AND ppsta.team_id = ta.id
      LEFT JOIN hp_prediction_predicts_score_for_team AS ppstb
          ON ppstb.prediction_id = p.id AND ppstb.team_id = tb.id
      INNER JOIN hp_risk AS r
          ON r.id = g.risk_id

      ORDER BY g.starts_at, g.name
  `;

  return database.many(sqlQuery)
    .then((predictions) => {
      const allDates = _(predictions)
        .map((game) => moment(game.startsAt).startOf('day').valueOf())
        .uniq()
        .value();

      const today = moment().startOf('day').valueOf();
      const nextDay = _(allDates).find((day) => day >= today);
      const previousDay = _(allDates).slice().reverse().find((day) => day < today);

      return _(predictions)
        .filter((game) => {

          const dayOfGame = moment(game.startsAt).startOf('day').valueOf();

          if (period === 'previous-days') {
            return dayOfGame <= previousDay;
          }

          if (period === 'next-days') {
            return dayOfGame >= nextDay;
          }

          return true;
        })
        .thru((allPredictions) => {

          if (period === 'previous-days') {
            return _(allPredictions).slice().reverse().value();
          }

          return allPredictions;
        })
        .map((game) => {

          // Initialize amount of risked points to the maximum if not defined
          game.predictionRiskAmount = game.predictionRiskAmount || 3;

          // Calculate the total number of points for a prediction
          if (game.classicPoints != null) {
            game.points = game.classicPoints + (game.riskPoints || 0);
          }

          return game;
        })
        .groupBy((game) => {
          return moment(game.startsAt).startOf('day');
        });
    });
}

class GameAlreadyBegunError extends Error {
  constructor (message) {
    super(`GameAlreadyBegunError: ${message}`);
  }
}

module.exports = {
  connectUser,
  getUserCount,
  getUser,
  updateUser,
  getUserGroups,
  upsertPrediction,
  getPredictions,
  GameAlreadyBegunError,
};
