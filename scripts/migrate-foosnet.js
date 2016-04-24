const request = require('superagent');

const FN_URL_BASE = 'http://bld-foosnet-01.f4tech.com';
const SBN_LEAGUE_ID = '57166399b4a8f6903917912c';
const SBN_URL_BASE = process.env.DEV ? 'http://localhost:5000' : 'http://sportsballnet.herokuapp.com';

const getFnPlayers = () => new Promise((resolve, reject) => {
  request
    .get(`${FN_URL_BASE}/players`)
    .end((err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(res.body);
      }
    });
});

const addPlayerToSbnLeague = (playerData, delay) => new Promise((resolve, reject) => {
  if (playerData.email && playerData.email) {
    setTimeout(() => {
      console.log(`Adding ${playerData._id} to league`);
      request
        .post(`${SBN_URL_BASE}/api/leagues/${SBN_LEAGUE_ID}/players`)
        .send(playerData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(`Added ${playerData._id} to league successfully`);
            resolve(res.body);
          }
        });
    }, delay);
  } else {
    resolve(null);
  }
});

const getFnGameHistory = () => new Promise((resolve, reject) => {
  request
    .get(`${FN_URL_BASE}/matches`)
    .end((err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(res.body);
      }
    });
});

const reportSbnGame = (gameResults, delay) => new Promise((resolve, reject) => {
  request
    .post(`${SBN_URL_BASE}/api/games`)
    .send(gameResults)
    .end((err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(`Reported game ${res.body._id} successfully`);
        resolve(res.body);
      }
    });
});

getFnPlayers().then((fnPlayers) => {
  console.log(`Found ${fnPlayers.length} FoosNet players`);
  const fnPlayerIdToEmailMap = fnPlayers.reduce((map, fnPlayer) => {
    return Object.assign(map, { [ fnPlayer._id ]: fnPlayer.email.toLowerCase() });
  }, {});

  Promise.all(fnPlayers.map((player, index) => addPlayerToSbnLeague(player, index * 1000))).then((leaguePlayers) => {
    console.log('Players added to SportsBallNet successfully');
    leaguePlayers = leaguePlayers.filter((player) => player !== null);

    const sbnPlayerEmailToIdMap = leaguePlayers.reduce((map, leaguePlayer) => {
      return Object.assign(map, { [ leaguePlayer.player.email.toLowerCase() ]: leaguePlayer.player._id });
    }, {});

    getFnGameHistory().then((fnGames) => {
      console.log(`Found ${fnGames.length} FoosNet games`);
      var reportGame = Promise.resolve();

      fnGames.reverse().forEach((fnGame, index) => {
        const sbnWinners = fnGame.winners.map((fnWinnerId) => {
          const playerEmail = fnPlayerIdToEmailMap[fnWinnerId.toString()];
          return sbnPlayerEmailToIdMap[playerEmail];
        });

        const sbnLosers = fnGame.losers.map((fnLoserId) => {
          const playerEmail = fnPlayerIdToEmailMap[fnLoserId.toString()];
          return sbnPlayerEmailToIdMap[playerEmail];
        });

        if (sbnWinners[0] && sbnWinners[1] && sbnLosers[0] && sbnLosers[1]) {
          reportGame = reportGame.then(() => {
            return reportSbnGame({
              winners: sbnWinners,
              losers: sbnLosers,
              playedDate: fnGame.date,
              league: SBN_LEAGUE_ID
            });
          });
        } else {
          console.log(`Dropping game ${fnGame._id} due to missing players`);
        }
      });
    });
  });
});
