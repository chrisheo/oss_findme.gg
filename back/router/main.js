module.exports = function (app) {

  var request = require("request");
  var urlenconde = require('urlencode');
  var apikey = "RGAPI-3f849a35-01f8-4915-a606-87cfc4800ef2"//api

  app.get('/', function (req, res) {
    res.render('main', { title: 'R U TROLL?' });
  });


  app.get('/tft/search/:username/', function (req, res) {
    // tft api url
    const summonerName = req.params.username;
    var nameUrl = `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${apikey}`
    request(nameUrl, function (error, response, body) {

      var info_summoner_json = JSON.parse(body);
      console.log('summoner', body);
      if (info_summoner_json.status?.status_code) {
        return res.render('index_tft', {
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
              res.render('index_tft', {
                title: req.params.username,
                error_message: false,
                c_matchList: matches, // 게임 데이터, array
                c_summoner: info_summoner_json, // 소환사, object
                c_leagueList: info_league_json // leagues 데이터, array
              });
            })
          } else {
            res.render('index_tft', {
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

  app.get('/search/:username/', function(req, res){
    //롤 api url
    name = req.params.username;
    var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
    request(nameUrl,function(error,response,body){
      var info_summoner_json = JSON.parse(body);
      accountId = info_summoner_json["accountId"];
      id = info_summoner_json["id"];
      summoner = info_summoner_json["name"];
      profileIconId = info_summoner_json["profileIconId"];
      summonerLevel = info_summoner_json["summonerLevel"];
      revisionDate = info_summoner_json["revisionDate"];
      var rankedUrl = "https://kr.api.pvp.net/api/lol/kr/v2.5/league/by-summoner/"+ urlenconde(id)+ "?api_key=" + apikey;
      var champUrl = "https://kr.api.pvp.net/api/lol/kr/v1.3/stats/by-summoner/" + urlenconde(id) + "/ranked?api_key=" + apikey;
      request(champUrl,function(error,response,body){
        var info_champ_json = JSON.parse(body);
        var champions = info_champ_json["champions"];
        var champ_point = new Array();
        var champ_id = new Array();
        var champ_name = new Array();
        var champ_pic = new Array();
        var champions_length = Object.keys(champions).length;
        for(var i=0; i < champions_length; i++){
          champ_point[i] = (champions[i]["stats"]["totalSessionsWon"]/champions[i]["stats"]["totalSessionsPlayed"]*200)
          + ((champions[i]["stats"]["totalAssists"]+champions[i]["stats"]["totalChampionKills"])/champions[i]["stats"]["totalDeathsPerSession"]*100)
          + (champions[i]["stats"]["totalSessionsPlayed"]*3);
          champ_id[i] = champions[i]["id"];
        }
        var staticUrl = "https://global.api.pvp.net/api/lol/static-data/kr/v1.2/champion/?api_key=" + apikey;
        request(staticUrl,function(error,response,body){
          var info_static_champ_json = JSON.parse(body);
          var champion = info_static_champ_json["data"];
          for(var i=0; i < champ_id.length; i++){
                for(js in champion){
                  for(j in champion[js]){
                    if(champion[js]["id"] == champ_id[i]){
                      champ_name[i] = champion[js]["key"];
                      champ_pic[i] = "https://opgg-static.akamaized.net/images/lol/champion/"+champ_name[i]+".png?image=c_scale,w_46";
                    }
                  }
                }
          }
          champ_name[champ_name.length] = "total";
          var temp_id;
          var temp_name;
          var temp_point;
          var temp_pic;
          for(var i=0; i < champ_id.length-1; i++){
            for(var j=i+1;j <champ_id.length-1; j++)
            if(champ_point[i] > champ_point[j]){
              temp_id = champ_id[i];
              temp_name = champ_name[i];
              temp_point = champ_point[i];
              temp_pic = champ_pic[i];
              champ_id[i] = champ_id[j]
              champ_name[i] = champ_name[j];
              champ_point[i] = champ_point[j];
              champ_pic[i] = champ_pic[j];
              champ_id[j] = temp_id
              champ_name[j] = temp_name;
              champ_point[j] = temp_point;
              champ_pic[j] = temp_pic;
            }
          }
          res.render('index_lol', { title: req.params.username ,
          c_id: champ_id,
          c_name: champ_name,
          c_point: champ_point,
          c_pic: champ_pic,
          c_summoner: summoner
          });
        });
      });
    });
  });
};
