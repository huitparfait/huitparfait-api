'use strict';

const database = require('../database-pool');
const sql = require('sql-tag');

function getPredictionsToCompute (beforeTimestamp) {

  const beforeDate = new Date(beforeTimestamp);

  const sqlQuery = sql`
      SELECT
          p.id,
          g.id AS game_id,
          g.starts_at,
          tpga.goals AS game_goals_a,
          tpgb.goals AS game_goals_b,
          g.risk_happened AS risk_happened,
          ppsta.goal AS prediction_goals_a,
          ppstb.goal AS prediction_goals_b,
          p.risk_will_happen AS risk_will_happen,
          p.risk_amount AS risk_amount
      FROM
          hp_prediction AS p
          INNER JOIN hp_game AS g ON p.game_id = g.id
          INNER JOIN hp_team_plays_in_game AS tpga ON g.id = tpga.game_id AND tpga.order = 1 
          INNER JOIN hp_team_plays_in_game AS tpgb ON g.id = tpgb.game_id AND tpgb.order = 2
          INNER JOIN hp_prediction_predicts_score_for_team AS ppsta ON p.id = ppsta.prediction_id AND tpga.team_id = ppsta.team_id
          INNER JOIN hp_prediction_predicts_score_for_team AS ppstb ON p.id = ppstb.prediction_id AND tpgb.team_id = ppstb.team_id
      WHERE
          ${beforeDate} < g.starts_at
          AND tpga.goals IS NOT NULL
          AND tpgb.goals IS NOT NULL
          AND g.risk_happened IS NOT NULL
`;

  return database.many(sqlQuery);
}

function computeManyPredictionPoints (predictions) {
  return predictions.map((p) => {
    const classicPoints = calculateClassicPoints(p);
    const riskPoints = calculateRiskPoints(p);
    return { id: p.id, classicPoints, riskPoints };
  });
}

function calculateClassicPoints ({ gameGoalsA, gameGoalsB, predictionGoalsA, predictionGoalsB }) {

  const gameWinner = findTeamWinner(gameGoalsA, gameGoalsB);
  const predictedWinner = findTeamWinner(predictionGoalsA, predictionGoalsB);

  const teamAPoints = (predictionGoalsA === gameGoalsA) ? 1 : 0;
  const teamBPoints = (predictionGoalsB === gameGoalsB) ? 1 : 0;
  const winnerPoints = (gameWinner === predictedWinner) ? 3 : 0;

  return teamAPoints + teamBPoints + winnerPoints;
}

function findTeamWinner (goalsA, goalsB) {
  if (goalsA > goalsB) {
    return 'TeamA';
  }

  if (goalsA < goalsB) {
    return 'TeamB';
  }

  return 'Draw';
}

function calculateRiskPoints ({ riskHappened, riskWillHappen, riskAmount }) {
  if (riskWillHappen == null) {
    return 0;
  }

  if (riskWillHappen === riskHappened) {
    return riskAmount;
  }

  return riskAmount * -1;
}

function updateManyPredictionPoints (predictionsWithPoints) {
  return Promise.all(predictionsWithPoints.map((p) => updateOnePredictionPoints(p)));
}

function updateOnePredictionPoints ({ id, classicPoints, riskPoints }) {

  const sqlQuery = sql`
      UPDATE
          hp_prediction
      SET
          points_classic = ${classicPoints},
          points_risk = ${riskPoints}
      WHERE
          id = ${id}
`;

  return database.many(sqlQuery);
}

module.exports = {
  getPredictionsToCompute,
  computeManyPredictionPoints,
  updateManyPredictionPoints,
};
