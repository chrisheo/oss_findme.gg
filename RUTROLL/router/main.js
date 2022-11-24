module.exports = function (app) {

  var request = require("request");
  var urlenconde = require('urlencode');
  var apikey = "RGAPI-899abd44-2f7c-4e2d-981e-7cad9e50d1cb"//api

  app.get('/', function (req, res) {
    res.render('main', { title: 'R U TROLL?' });
  });

  app.get('/search/:username/', function (req, res) {
    // tft api url
    const summonerName = req.params.username;
    var nameUrl = `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${apikey}`
    request(nameUrl, function (error, response, body) {

      var info_summoner_json = JSON.parse(body);
      console.log('summoner', body);
      if (info_summoner_json.status?.status_code) {
        return res.render('index', {
          title: req.params.username,
          error_message: info_summoner_json.status?.message
        });
      }
      const summonerId = info_summoner_json["id"];
      const summoner = info_summoner_json["name"];
      const leagueUrl = `https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${apikey}`;
      request(leagueUrl, function (error, response, body) {
        const info_league_json = JSON.parse(body);
        const matchIdUrl = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${info_summoner_json.puuid}/ids?api_key=${apikey}`;
        request(matchIdUrl, function (error, response, body) {
          const matchIdList = JSON.parse(body);
          console.log('matchIds', matchIdList);
          const promiseList = [];
          if (matchIdList.length > 0) {
            matchIdList.forEach(matchId => {
              promiseList.push(new Promise((resolve, reject) => {
                const matchURL = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${apikey}`;
                request(matchURL, function (error, response, body) {
                  const match = JSON.parse(body);
                  resolve(match);
                });
              }));
            });
            Promise.all(promiseList).then(matches => {
              console.log('matches', matches);
              res.render('index', {
                title: req.params.username,
                error_message: false,
                c_matchList: matches, // 게임 데이터, array
                c_summoner: info_summoner_json, // 소환사, object
                c_leagueList: info_league_json // leagues 데이터, array
              });
            })
          } else {
            res.render('index', {
              title: req.params.username,
              error_message: false,
              c_matchList: [],
              c_summoner: info_summoner_json,
              c_leagueList: info_league_json
            });
          }
        });
        console.log('league', body);
      });
    });
  });
};
