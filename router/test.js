module.exports = function(app){

    var request = require("request");
    var urlenconde = require('urlencode');
    var apikey = "RGAPI-2ac4afdc-e474-467b-ad1f-e08d559bf95b"//api
    
    var profileIconId;  //아이콘 번호
    var revisionDate; //수정날짜
    var puuid;
    var id; //소환사ID
    var accountId; //계정Id
    var name; //소환사 이름
    var summonerLevel;  //소환사
    var rotation_champ = new Array();
    
      app.get('/', function(req, res) {
            res.render('main', { title: 'Your TFT.GG?' });
      });
    
      app.get('/search/:username/', function(req, res, next){
        //롤 api url
        name = req.params.username;
        var nameUrl = "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
        request(nameUrl,function(error,response,body){
    
            // 요청에 대한 응답이 성공적으로 왔는지 검사.
            // status code가 200이 아니면 오류가 있었던 것으로 간주하고 함수 종료.
            
            if (response.statusCode != 200) {
                console.log('Error with response code22 ', response.statusCode);
                res.end();
                return;
            }
    
          var info_summoner_json = JSON.parse(body);
    
          accountId = info_summoner_json["accountId"];
          id = info_summoner_json["id"];
          puuid = info_summoner_json["puuid"];
          summoner = info_summoner_json["name"];
          profileIconId = info_summoner_json["profileIconId"];
          summonerLevel = info_summoner_json["summonerLevel"];
          revisionDate = info_summoner_json["revisionDate"];
    
          var champUrl = "https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + urlenconde(id) + "?api_key=" + apikey;
          request(champUrl,function(error,response,body){
            var trait_id=new Array();
            var char_id=new Array();
            var char_img=new Array();
            var trait_img=new Array();
            var info_champ_json = JSON.parse(body);
            var champ_point = new Array();
            var champ_id = new Array();
            var champ_name = new Array();
            var rotation_name = new Array();
            var champ_pic = new Array();
            var rotation_pic =new Array();
            var champions_length = Object.keys(info_champ_json).length;
    
        //console.log("\n\ninfo_champ_json\n\n", info_champ_json);
    
            // status code가 200이 아니면 종료.
           
    
            var rotationUrl = "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+apikey;
            request(rotationUrl,function(error,response,body){
              var info_rotation = JSON.parse(body);
              var keys = Object.keys(info_rotation);

            var staticUrl = "http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json";
            request(staticUrl,function(error,response,body){
              var info_static_champ_json = JSON.parse(body);
              var champion = info_static_champ_json["data"];
  
              var userLeagueUrl = "https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/"+ urlenconde(id)+"?api_key=" + apikey;
              request(userLeagueUrl,function(error,response,body){
                var info_user_league_json = JSON.parse(body);
                //console.log("userLeagueUrl:", userLeagueUrl);
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
             var userMatchUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/"+urlenconde(puuid)+"/ids?start=0&count=20&api_key="+apikey;
             request(userMatchUrl,function(error,response,body){
                var info_match=JSON.parse(body);
                var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[0]) + "?api_key=" +apikey;
                  
                request(userGameUrl,function(error,response,body){
                    var info_game = JSON.parse(body);
  
                    for(var j=0;j<8;j++){
                      if(info_game["info"]["participants"][j]["puuid"]==puuid){
                        for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                          trait_id[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                        }
                        for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                          char_id[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                        }
                            
                      }
                    }
                    for(var i=0;i<char_id.length;i++){
                      if(char_id[i]=="Sejuani"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1653029956.png";
                      }
                      else if(char_id[i]=="Ezreal"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1653030256.png";
                      }
                      else if(char_id[i]=="Twitch"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                      }
                      else if(char_id[i]=="Varus"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Varus_1653029781.png";
                      }
                      else if(char_id[i]=="DragonGuild"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zippy_1664508034-Zippy_1661407350-tft7_zippy_square.tft_set7_stage2.png";
                      }
                      else if(char_id[i]=="Hecarim"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Hecarim_1653030476.png";
                      }
                      else if(char_id[i]=="Jayce"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Jayce_1661160949-Jayce.jpg";
                      }
                      
                    }


                    for(var i=0;i<trait_id.length;i++){
                    
                      if(trait_id[i]=="Astral"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Astral_normal_1658472777-astral.svg";
                      }
                      else if(trait_id[i]=="Guild"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Guild_normal_1658472708-guild.svg"
                      }
                      else if(trait_id[i]=="Jade"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Jade_normal_1658472802-jade.svg"
                      }
                      else if(trait_id[i]=="Mirage"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Mirage_normal_1658472829-mirage.svg"
                      }
                      else if(trait_id[i]=="Ragewing"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Ragewing_normal_1658472786-ragewing.svg"
                      }
                      else if(trait_id[i]=="Revel"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Revel_normal_1658472846-revel.svg"
                      }
                      else if(trait_id[i]=="Scalescorn"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Scalescorn_normal_1658472793-scalescorn.svg"
                      }
                      else if(trait_id[i]=="Shimmerscale"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Shimmerscale_normal_1658472811-shimmerscale.svg"
                      }
                      else if(trait_id[i]=="Assasin"){
                        trait_img[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/assassin.svg"
                      }
                      else if(trait_id[i]=="Cavalier"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Cavalier_normal_1658472863-cavalier.svg"
                      }
                      else if(trait_id[i]=="Dragon"){
                        trait_img[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/dragons.svg"
                      }
                      else if(trait_id[i]=="Shapeshifter"){
                        trait_img[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/shapeshifter.svg"
                      }
                      else if(trait_id[i]=="Swiftshot"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Swiftshot_normal_1658472880-swiftshot.svg"
                      }
                      else if(trait_id[i]=="Tempest"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Tempest_normal_1658472854-tempest.svg"
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
                     
                     res.render('index', { title: req.params.username ,
                     c_imgtrait: trait_img,
                     c_imgchar: char_img,
                     c_id: champ_id,
                     c_name: champ_name,
                     c_point: champ_point,
                     c_pic: champ_pic,
                     c_rotation : rotation_pic,
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
      });
        });
      });
};