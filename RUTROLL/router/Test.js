module.exports = function(app){

var request = require("request");
var urlenconde = require('urlencode');
var apikey = "RGAPI-d871b6f2-cf20-4e39-8ee1-4c3a663b2d01"//api

var profileIconId;  //아이콘 번호
var revisionDate; //수정날짜
var id; //소환사ID
var accountId; //계정Id
var name; //소환사 이름
var summonerLevel;  //소환사 레벨

  app.get('/', function(req, res) {
  	  res.render('main', { title: 'R U TROLL?' });
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
			console.log('Error with response code ', response.statusCode);
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

      var champUrl = "https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + urlenconde(id) + "?api_key=" + apikey;
      request(champUrl,function(error,response,body){
        var info_champ_json = JSON.parse(body);
        var champ_point = new Array();
        var champ_id = new Array();
        var champ_name = new Array();
        var champ_pic = new Array();
        var champions_length = Object.keys(info_champ_json).length;

		console.log("\n\ninfo_champ_json\n\n", info_champ_json);

		// status code가 200이 아니면 종료.
		if (info_champ_json["status"] != undefined) {
			if (info_champ_json["status"]["status_code"] != 200) {
				console.log('Error with response code ', info_champ_json["status"]["status_code"]);
				res.end();
				return;
			}
		}

        for(var i=0; i < champions_length; i++){
          champ_point[i] = (info_champ_json[i]["championPoints"]);
          champ_id[i] = info_champ_json[i]["championId"];
        }

        var staticUrl = "http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json";
        request(staticUrl,function(error,response,body){
          var info_static_champ_json = JSON.parse(body);
          var champion = info_static_champ_json["data"];
          for(var i=0; i < champ_id.length; i++){
                for(js in champion){
                  for(j in champion[js]){
                    if(champion[js]["key"] == champ_id[i]){
                      champ_name[i] = champion[js]["id"];
                      champ_pic[i] = "http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/"+champ_name[i]+".png";
                    }
                  }
                }
          }
          var userLeagueUrl = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ urlenconde(id)+"?api_key=" + apikey;
          request(userLeagueUrl,function(error,response,body){
            var info_user_league_json = JSON.parse(body);
			console.log("userLeagueUrl:", userLeagueUrl);
            if(info_user_league_json[0] != null){
            var leagueId = info_user_league_json[0]["leagueId"];
            var wins = info_user_league_json[0]["wins"];
            var losses = info_user_league_json[0]["losses"];
            var leagueName = info_user_league_json[0]["leagueName"]
            var tier = info_user_league_json[0]["tier"];
            var rank = info_user_league_json[0]["rank"];
            var leaguePoints = info_user_league_json[0]["leaguePoints"];
            var img_tier;
            if(tier == "MASTER"){
              img_tier = "https://i.imgur.com/nvQjonh.png";
            }else if(tier == "CHALLENGER"){
              img_tier = "https://i.imgur.com/sbK1Edj.png";
            }else if(tier == "DIAMOND"){
              img_tier = "https://i.imgur.com/5VBu8PF.png"
            }else if(tier == "PLATINUM"){
              img_tier = "https://i.imgur.com/Eqi6858.png"
            }else if(tier == "GRANDMASTER"){
              img_tier = "https://i.imgur.com/mcEhz1o.png"
            }else if(tier == "GOLD"){
              img_tier = "https://i.imgur.com/Ec4hPuO.png"
            }else if(tier == "SILVER"){
              img_tier = "https://i.imgur.com/GKnPu7s.png"
            }else if(tier == "BRONZE"){
              img_tier ="https://i.imgur.com/TPZVXIr.png"
            }else{
              img_tier = "https://i.imgur.com/kcdoC4r.png"
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
         const defaultMMR = [
           {"mmr" : 900, "tier" : "iron", "rank": 4}
           {"mmr" : 950, "tier" : "iron", "rank": 3}
           {"mmr" : 1000, "tier" : "iron", "rank": 2}
           {"mmr" : 1050, "tier" : "iron", "rank": 1}
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

          res.render('index', { title: req.params.username ,
          c_id: champ_id,
          c_name: champ_name,
          c_point: champ_point,
          c_pic: champ_pic,
          c_summoner: summoner,
          c_wins: wins,
          c_losses: losses,
          c_tier: tier,
          c_imgtier: img_tier,
          c_rank: rank,
          c_leaguePoint: leaguePoints
          });
        });
      });
    });
    });
  });
};
