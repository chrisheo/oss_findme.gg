const express = require('express');
const router = express.Router();
const request = require("request");
const urlenconde = require('urlencode');
const apikey = "RGAPI-3f849a35-01f8-4915-a606-87cfc4800ef2"//api
router.get('/search/summoner/:username/', function (req, res) {
  //롤 api url
  const name = req.params.username;
  var nameUrl = "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + urlenconde(name) + "?api_key=" + apikey;
  request(nameUrl, function (error, response, body) {
    var info_summoner_json = JSON.parse(body);
    const summonerId = info_summoner_json.id;
    const rankUrl = `https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/${urlenconde(summonerId)}?api_key=${apikey}`;
    request(rankUrl, function (error, response, body) {
      const rank_info = JSON.parse(body);
      res.json({
        status: 200,
        data: {
          summoner: info_summoner_json,
          leagueList: rank_info
        }
      });
    });
  });
});

router.get('/search/match/:puuid', function (req, res) {
  //api url
  const puuid = req.params.puuid;
  const matchIdUrl = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?api_key=${apikey}`;
  request(matchIdUrl, function (error, response, body) {
    const matchIdList = JSON.parse(body);
    const promiseList = [];
    matchIdList.forEach(matchId => {
      promiseList.push(new Promise((resolve, reject) => {
        const matchURL = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${apikey}`;
        request(matchURL, function (error, response, body) {
          const match = JSON.parse(body);
          resolve(match);
        });
      }));
      Promise.all(promiseList).then(matches => {
        res.json({
          status: 200,
          data: {
            matchList: matches
          }
        });
      })
    });
  });

  module.exports = router;