module.exports = function (app) {

  var request = require("request");
  var urlenconde = require('urlencode');
  var apikey = "RGAPI-899abd44-2f7c-4e2d-981e-7cad9e50d1cb"//api

  app.get('/', function (req, res) {
    res.render('main', { title: 'R U TROLL?' });
  });

  app.get('/search/:username/', function (req, res) {
    //롤 api url
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
        console.log('league', body);
        res.render('index', {
          title: req.params.username,
          error_message: false,
          c_summoner: summoner,
          c_leagueList: info_league_json
        });
      });
    });
  });
};
