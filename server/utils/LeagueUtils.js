const Immutable = require('immutable');
const elo = require('elo-rank')();

const DEFAULT_ELO = 1000;

function getNewElo(playerElo, opponentElos, isWinner) {
  var adjustedElos = [];

  opponentElos.forEach((opponentElo) => {
    const expectedScore = elo.getExpected(playerElo, opponentElo);
    adjustedElos.push(elo.updateRating(expectedScore, isWinner ? 1 : 0, playerElo));
  });

  return adjustedElos.reduce((sum, elo) => sum + elo, 0) / adjustedElos.length;
}

module.exports = {
  getPlayerDetails: (games, playerIds) => {
    var currentElo, opponentElos;

    const playerDetailsMap = games.reduce((playerDetailsMap, game) => {
      const newElos = {};

      game.winners.forEach((winnerId) => {
        currentElo = playerDetailsMap.getIn([winnerId, 'elo']) || DEFAULT_ELO;
        opponentElos = game.losers.map((loserId) => playerDetailsMap.getIn([loserId, 'elo']) || DEFAULT_ELO);
        newElos[winnerId] = getNewElo(currentElo, opponentElos, true);
      });

      game.losers.forEach((loserId) => {
        currentElo = playerDetailsMap.getIn([loserId, 'elo']) || DEFAULT_ELO;
        opponentElos = game.winners.map((winnerId) => playerDetailsMap.getIn([winnerId, 'elo']) || DEFAULT_ELO);
        newElos[loserId] = getNewElo(currentElo, opponentElos, false);
      });

      game.winners.forEach((winnerId) => {
        playerDetailsMap = playerDetailsMap.updateIn([winnerId, 'elo'], (elo) => newElos[winnerId] || DEFAULT_ELO)
                                           .updateIn([winnerId, 'wins'], (wins) => (wins || 0) + 1)
                                           .updateIn([winnerId, 'losses'], (losses) => losses || 0)
                                           .updateIn([winnerId, 'streak'], (streak) => streak > 0 ? streak + 1 : 1);
      });

      game.losers.forEach((loserId) => {
        playerDetailsMap = playerDetailsMap.updateIn([loserId, 'elo'], (elo) => newElos[loserId] || DEFAULT_ELO)
                                           .updateIn([loserId, 'losses'], (losses) => (losses || 0) + 1)
                                           .updateIn([loserId, 'wins'], (wins) => wins || 0)
                                           .updateIn([loserId, 'streak'], (streak) => streak < 0 ? streak - 1 : -1);
      });

      return playerDetailsMap;
    }, Immutable.Map()).toJS();

    playerIds.forEach((playerId) => {
      if (!playerDetailsMap[playerId]) {
        playerDetailsMap[playerId] = {
          elo: DEFAULT_ELO,
          losses: 0,
          streak: 0,
          wins: 0
        };
      }

      playerDetailsMap[playerId].elo = Math.round(playerDetailsMap[playerId].elo);
    });

    return playerDetailsMap;
  }
};
