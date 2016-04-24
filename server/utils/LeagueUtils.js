const Immutable = require('immutable');
const elo = require('elo-rank')();

const DEFAULT_ELO = 1000;

const getNewElos = (winners, losers) => {
  var newElos = {};
  const totalWinnerElo = winners.reduce((sum, winner) => sum + winner.elo, 0);
  const totalLoserElo = losers.reduce((sum, loser) => sum + loser.elo, 0);
  const expectedWinnerElo = elo.getExpected(totalWinnerElo, totalLoserElo);
  const expectedLoserElo = elo.getExpected(totalLoserElo, totalWinnerElo);
  const winnersAdjustedElo = elo.updateRating(expectedWinnerElo, 1, totalWinnerElo);
  const losersAdjustedElo = elo.updateRating(expectedLoserElo, 0, totalLoserElo);

  if (winners.length === 1 && losers.length === 1) {
    newElos[winners[0].playerId] = winnersAdjustedElo;
    newElos[losers[0].playerId] = losersAdjustedElo;
  } else {
    winners.forEach((winner) => {
      const gainRatio = (totalWinnerElo - winner.elo) / totalWinnerElo;
      const totalGain = winnersAdjustedElo - totalWinnerElo;
      newElos[winner.playerId] = winner.elo + (totalGain * gainRatio);
    });

    losers.forEach((loser) => {
      const gainRatio = (totalLoserElo - loser.elo) / totalLoserElo;
      const totalGain = losersAdjustedElo - totalLoserElo;
      newElos[loser.playerId] = loser.elo + (totalGain * gainRatio);
    });
  }

  return newElos;
};

module.exports = {
  getPlayerDetails: (games, playerIds) => {
    const playerDetailsMap = games.reduce((playerDetailsMap, game) => {
      const winners = game.winners.map((id) => {
        const playerId = id.toString();
        return { playerId, elo: playerDetailsMap.getIn([playerId, 'elo'], DEFAULT_ELO) };
      });

      const losers = game.losers.map((id) => {
        const playerId = id.toString();
        return { playerId, elo: playerDetailsMap.getIn([playerId, 'elo'], DEFAULT_ELO) };
      });

      const newElos = getNewElos(winners, losers);

      winners.forEach((winner) => {
        const playerId = winner.playerId;
        playerDetailsMap = playerDetailsMap.setIn([playerId, 'elo'], newElos[playerId])
                                           .setIn([playerId, 'lastPlayed'], (lastPlayed) => game.playedDate.toString())
                                           .updateIn([playerId, 'wins'], (wins) => (wins || 0) + 1)
                                           .updateIn([playerId, 'streak'], (streak) => streak > 0 ? streak + 1 : 1);
      });

      losers.forEach((loser) => {
        const playerId = loser.playerId;
        playerDetailsMap = playerDetailsMap.setIn([playerId, 'elo'], newElos[playerId])
                                           .setIn([playerId, 'lastPlayed'], (lastPlayed) => game.playedDate.toString())
                                           .updateIn([playerId, 'losses'], (losses) => (losses || 0) + 1)
                                           .updateIn([playerId, 'streak'], (streak) => streak < 0 ? streak - 1 : -1);
      });

      return playerDetailsMap;
    }, Immutable.Map()).toJS();

    playerIds.forEach((id) => {
      const playerId = id.toString();
      playerDetailsMap[playerId] = Object.assign({
        elo: DEFAULT_ELO,
        lastPlayed: null,
        losses: 0,
        streak: 0,
        wins: 0
      }, playerDetailsMap[playerId]);

      playerDetailsMap[playerId].elo = Math.round(playerDetailsMap[playerId].elo);
    });

    return playerDetailsMap;
  }
};
