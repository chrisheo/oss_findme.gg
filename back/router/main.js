module.exports = function (app) {

  var request = require("request");
  var urlenconde = require('urlencode');
  var apikey = "RGAPI-a3623471-f6c1-482d-9fba-736ef31ec016"//api

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

  app.get('/search/:username/', function(req, res, next){
    //롤 api url
    name = req.params.username;
    var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
    request(nameUrl,function(error,response,body){
        // 요청에 대한 응답이 성공적으로 왔는지 검사.
        // status code가 200이 아니면 오류가 있었던 것으로 간주하고 함수 종료.
        console.log('response code ', response.statusCode);
        if (response.statusCode != 200) {
           console.log('Error with response code22 ', response.statusCode);
           res.end();
           return;
        }
      var info_summoner_json = JSON.parse(body);
      accountId = info_summoner_json["accountId"];
      id = info_summoner_json["id"];
      summoner = info_summoner_json["name"];
      profileIconId = info_summoner_json["profileIconId"];
      summonerLevel = info_summoner_json["summonerLevel"];
      revisionDate = info_summoner_json["revisionDate"];
      var profileUrl="http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/";
      request(profileUrl,function(error,response,body){
        var profileIcon;
        profileIcon="http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/"+profileIconId+".png";
        var champUrl = "https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + urlenconde(id) + "?api_key=" + apikey;
        request(champUrl,function(error,response,body){
          var info_champ_json = JSON.parse(body);
          var champ_point = new Array();
          var champ_id = new Array();
          var champ_name = new Array();
          var rotation_name = new Array();
          var champ_pic = new Array();
          var rotation_pic =new Array();
          var champions_length = Object.keys(info_champ_json).length;
          var champ_level=new Array();//숙련도 레벨
          var champ_korname=new Array();
           //console.log("\n\ninfo_champ_json\n\n", info_champ_json);
            // status code가 200이 아니면 종료.
            if (info_champ_json["status"] != undefined) {
               if (info_champ_json["status"]["status_code"] != 200) {
                  console.log('Error with response code11 ', info_champ_json["status"]["status_code"]);
                  res.end();
                  return;
               }
            }
          for(var i=0; i < champions_length; i++){
            champ_point[i] = (info_champ_json[i]["championPoints"]);
            champ_id[i] = info_champ_json[i]["championId"];
            champ_level[i]=info_champ_json[i]["championLevel"]
          }
          var rotationUrl = "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+apikey;
          request(rotationUrl,function(error,response,body){
            var info_rotation = JSON.parse(body);
            var keys = Object.keys(info_rotation);
            for(var k =0; k < info_rotation[keys[0]].length;k++){
              rotation_champ[k] =info_rotation[keys[0]][k]
              console.log("rotation_champ:"+rotation_champ[k]);
              console.log("로테길이:"+rotation_champ.length);
            }
            var staticUrl = "http://ddragon.leagueoflegends.com/cdn/10.23.1/data/ko_KR/champion.json";
            request(staticUrl,function(error,response,body){
              var info_static_champ_json = JSON.parse(body);
              var champion = info_static_champ_json["data"];
              for(var i=0; i < champ_id.length; i++){
                for(js in champion){
                  for(j in champion[js]){
                    if(champion[js]["key"] == champ_id[i]){
                      champ_name[i] = champion[js]["id"];
                      champ_pic[i] = "http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/"+champ_name[i]+".png";
                      champ_korname[i]=champion[js]["name"];
                    }
                  }
                }
              }
              for(var i=0; i < champ_id.length; i++){
                for(js in champion){
                  for(j in champion[js]){
                    if(champion[js]["key"] == rotation_champ[i]){
                      rotation_name[i] = champion[js]["id"];
                      rotation_pic[i] = "http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/"+rotation_name[i]+".png";
                    }
                  }
                }
          }
          console.log("챔프길이:"+champ_pic.length);
          var userLeagueUrl = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ urlenconde(id)+"?api_key=" + apikey;
          request(userLeagueUrl,function(error,response,body){
            var info_user_league_json = JSON.parse(body);
         //console.log("userLeagueUrl:", userLeagueUrl);
            if(info_user_league_json[0] != null){ // 솔랭 데이터
              var leagueId_S = info_user_league_json[0]["leagueId"];
              var wins_S = info_user_league_json[0]["wins"];
              var losses_S = info_user_league_json[0]["losses"];
              var leagueName_S = info_user_league_json[0]["leagueName"]
              var tier_S = info_user_league_json[0]["tier"];
              var rank_S = info_user_league_json[0]["rank"];
              var leaguePoints_S = info_user_league_json[0]["leaguePoints"];
              var img_tier_S;
              if(tier_S == "MASTER"){
                img_tier_S = "https://imgur.com/gcQbTc8.png";
              }else if(tier_S == "CHALLENGER"){
                img_tier_S = "https://i.imgur.com/sbK1Edj.png";
              }else if(tier_S == "DIAMOND"){
                img_tier_S = "https://i.imgur.com/5VBu8PF.png"
              }else if(tier_S == "PLATINUM"){
                img_tier_S = "https://i.imgur.com/Eqi6858.png"
              }else if(tier_S == "GRANDMASTER"){
                img_tier_S = "https://i.imgur.com/mcEhz1o.png"
              }else if(tier_S == "GOLD"){
                img_tier_S = "https://i.imgur.com/Ec4hPuO.png"
              }else if(tier_S == "SILVER"){
                img_tier_S = "https://i.imgur.com/GKnPu7s.png"
              }else if(tier_S == "BRONZE"){
                img_tier_S ="https://i.imgur.com/TPZVXIr.png"
              }else if(tier_S == "IRON"){
                img_tier_S = "https://imgur.com/ZWpZusI.png"
              }
              else{
                
                img_tier_S="https://imgur.com/xZjjjsp.png"
              }
            }
            else{
              img_tier_S="https://imgur.com/xZjjjsp.png"
              
              var wins_S = 0;
              var losses_S = 0;
              
              var tier_S = "unranked";
              var rank_S = 0;
              var leaguePoints_S = 0;
            }
            if(info_user_league_json[1] != null){ // 자유랭 데이터
              var leagueId_F = info_user_league_json[1]["leagueId"];
              var wins_F = info_user_league_json[1]["wins"];
              var losses_F = info_user_league_json[1]["losses"];
              var leagueName_F = info_user_league_json[1]["leagueName"]
              var tier_F = info_user_league_json[1]["tier"];
              var rank_F = info_user_league_json[1]["rank"];
              var leaguePoints_F = info_user_league_json[1]["leaguePoints"];
              var img_tier_F;
              if(tier_F == "MASTER"){
                img_tier_F = "https://imgur.com/gcQbTc8.png";
              }else if(tier_F == "CHALLENGER"){
                img_tier_F = "https://i.imgur.com/sbK1Edj.png";
              }else if(tier_F == "DIAMOND"){
                img_tier_F = "https://i.imgur.com/5VBu8PF.png"
              }else if(tier_F == "PLATINUM"){
                img_tier_F = "https://i.imgur.com/Eqi6858.png"
              }else if(tier_F == "GRANDMASTER"){
                img_tier_F = "https://i.imgur.com/mcEhz1o.png"
              }else if(tier_F == "GOLD"){
                img_tier_F = "https://i.imgur.com/Ec4hPuO.png"
              }else if(tier_F == "SILVER"){
                img_tier_F = "https://i.imgur.com/GKnPu7s.png"
              }else if(tier_F == "BRONZE"){
                img_tier_F ="https://i.imgur.com/TPZVXIr.png"
              }else if(tier_F == "IRON"){
                img_tier_F = "https://imgur.com/ZWpZusI.png"
              }
              else{
                img_tier_F="https://imgur.com/xZjjjsp.png"
              }
            }
            else{
              img_tier_F="https://imgur.com/xZjjjsp.png"
              var wins_F = 0;
              var losses_F = 0;
              
              var tier_F = "unranked";
              var rank_F = 0;
              var leaguePoints_F = 0;
            }
          champ_name[champ_name.length] = "total";
          var temp_id;
          var temp_name;
          var temp_point;
          var temp_pic;
          var temp_chamlev;
          for(var i=0; i < champ_id.length-1; i++){//챔피언 sorting
            for(var j=i+1;j <champ_id.length-1; j++)
            if(champ_point[i] < champ_point[j]){
              temp_id = champ_id[i];
              temp_chamlev=champ_level[i];
              temp_name = champ_name[i];
              temp_point = champ_point[i];
              temp_pic = champ_pic[i];
              champ_level[i]=champ_level[j];
              champ_id[i] = champ_id[j]
              champ_name[i] = champ_name[j];
              champ_point[i] = champ_point[j];
              champ_pic[i] = champ_pic[j];
              champ_level[j]=champ_level[i];
              champ_id[j] = temp_id
              champ_name[j] = temp_name;
              champ_point[j] = temp_point;
              champ_pic[j] = temp_pic;
            }
          }
         const defaultMMR = [
           {"mmr" : 900, "tier" : "iron", "rank": 4},
           {"mmr" : 950, "tier" : "iron", "rank": 3},
           {"mmr" : 1000, "tier" : "iron", "rank": 2},
           {"mmr" : 1050, "tier" : "iron", "rank": 1},
           { "mmr" : 1100, "tier" : "bronze", "rank": 4 },
           { "mmr" : 1150, "tier" : "bronze", "rank": 3 },
           { "mmr" : 1200, "tier" : "bronze", "rank": 2 },
           { "mmr" : 1250, "tier" : "bronze", "rank": 1 },
           { "mmr" : 1300, "tier" : "silver", "rank": 4 },
           { "mmr" : 1350, "tier" : "silver", "rank": 3 },
           { "mmr" : 1400, "tier" : "silver", "rank": 2 },
           { "mmr" : 1450, "tier" : "silver", "rank": 1 },
           { "mmr" : 1500, "tier" : "gold", "rank": 4 },
           { "mmr" : 1550, "tier" : "gold", "rank": 3 },
           { "mmr" : 1600, "tier" : "gold", "rank": 2 },
           { "mmr" : 1650, "tier" : "gold", "rank": 1 },
           { "mmr" : 1700, "tier" : "platinum", "rank": 4 },
           { "mmr" : 1750, "tier" : "platinum", "rank": 3 },
           { "mmr" : 1800, "tier" : "platinum", "rank": 2 },
           { "mmr" : 1850, "tier" : "platinum", "rank": 1 },
           { "mmr" : 1900, "tier" : "diamond", "rank": 4 },
           { "mmr" : 1950, "tier" : "diamond", "rank": 3 },
           { "mmr" : 2000, "tier" : "diamond", "rank": 2 },
           { "mmr" : 2050, "tier" : "diamond", "rank": 1 },
           { "mmr" : 2100, "tier" : "master", "rank": 1 },
           { "mmr" : 2700, "tier" : "challenger", "rank": 1 },
         ]
          res.render('index', { title: req.params.username ,//ejs에 넣을 때 사용
          c_lev: champ_level,
          c_summonerlev: summonerLevel,
          c_korname: champ_korname,
          c_profile: profileIcon,
          c_id: champ_id,
          c_name: champ_name,
          c_point: champ_point,
          c_pic: champ_pic,
          c_rotation : rotation_pic,
          c_summoner: summoner,
          c_wins_S: wins_S,
          c_losses_S: losses_S,
          c_tier_S: tier_S,
          c_imgtier_S: img_tier_S,
          c_rank_S: rank_S,
          c_leaguePoint_S: leaguePoints_S,
          c_wins_F: wins_F,
          c_losses_F: losses_F,
          c_tier_F: tier_F,
          c_imgtier_F: img_tier_F,
          c_rank_F: rank_F,
          c_leaguePoint_F: leaguePoints_F
        });
      });
    });
          });
        });
      });
    });
  });
};
