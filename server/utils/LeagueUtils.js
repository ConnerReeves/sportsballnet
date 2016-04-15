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
      const winners = game.winners;
      const losers = game.losers;
      const newElos = {};

      winners.forEach((winnerId) => {
        playerDetailsMap = playerDetailsMap.updateIn([winnerId, 'wins'], (wins) => (wins || 0) + 1)
                                           .updateIn([winnerId, 'losses'], (losses) => losses || 0);

        currentElo = playerDetailsMap.getIn([winnerId, 'elo']) || DEFAULT_ELO;
        opponentElos = losers.map((loserId) => playerDetailsMap.getIn([loserId, 'elo']) || DEFAULT_ELO);
        newElos[winnerId] = getNewElo(currentElo, opponentElos, true);
      });

      losers.forEach((loserId) => {
        playerDetailsMap = playerDetailsMap.updateIn([loserId, 'losses'], (losses) => (losses || 0) + 1)
                                           .updateIn([loserId, 'wins'], (wins) => wins || 0);

        currentElo = playerDetailsMap.getIn([loserId, 'elo']) || DEFAULT_ELO;
        opponentElos = winners.map((winnerId) => playerDetailsMap.getIn([winnerId, 'elo']) || DEFAULT_ELO);
        newElos[loserId] = getNewElo(currentElo, opponentElos, false);
      });

      playerDetailsMap = playerDetailsMap.reduce((playerDetailsMap, playerDetail, playerId) => {
        return playerDetailsMap.setIn([playerId, 'elo'], newElos[playerId]);
      }, playerDetailsMap);

      console.log(newElos);

      return playerDetailsMap;
    }, Immutable.Map()).toJS();

    playerIds && playerIds.forEach((playerId) => {
      if (!playerDetailsMap[playerId]) {
        playerDetailsMap[playerId] = {
          wins: 0,
          losses: 0,
          elo: DEFAULT_ELO
        };
      }

      if (playerDetailsMap[playerId].elo === undefined) {
        playerDetailsMap[playerId].elo = DEFAULT_ELO;
      }
    });

    return playerDetailsMap;
  }
};
