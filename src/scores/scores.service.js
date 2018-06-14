'use strict';

const database = require('../database-pool');
const sql = require('sql-tag');

// Updates scores of a game
function updateScores ({ gameId, goalsTeamA, goalsTeamB, penaltiesTeamA, penaltiesTeamB, riskHappened }) {

  const sqlQuery = sql`
      WITH g AS (
          UPDATE
              hp_game
          SET
              updated_at = now(),
              risk_happened = ${riskHappened}
          WHERE
              id = ${gameId}
          RETURNING
              id,
              risk_happened
      ),
      tpga AS (
          UPDATE
              hp_team_plays_in_game
          SET
              updated_at = now(),
              goals = ${goalsTeamA},
              penalties = ${penaltiesTeamA}
          WHERE game_id = ${gameId}
          AND hp_team_plays_in_game.order = 1
          RETURNING
              goals
      ),
      tpgb AS (
          UPDATE
              hp_team_plays_in_game
          SET
              updated_at = now(),
              goals = ${goalsTeamB},
              penalties = ${penaltiesTeamB}
          WHERE game_id = ${gameId}
          AND hp_team_plays_in_game.order = 2
          RETURNING
              goals
      )
      SELECT 
          g.id AS gameId,
          g.risk_happened AS risk_happened,
          tpga.goals AS goalsTeamA,
          tpgb.goals AS goalsTeamB
      FROM
          g, tpga, tpgb
  `;

  return database.one(sqlQuery);
}

module.exports = {
  updateScores,
};
