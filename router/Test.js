const e = require("express");

module.exports = function(app){

    var request = require("request");
    var urlenconde = require('urlencode');
    var apikey = "RGAPI-fa35b84b-6598-4972-b259-41946c1f8860"//api 변경필요
    
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

      app.get('/tft/deck',function(req,res,next){
        
        var deck1_ch = new Array();
        var deck1_tr = new Array();
        var deck2_ch = new Array();
        var deck2_tr = new Array();
        var deck3_ch = new Array();
        var deck3_tr = new Array();
        var deck4_ch = new Array();
        var deck4_tr = new Array();
        var deck5_ch = new Array();
        var deck5_tr = new Array();

        deck1_ch[0]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg"
        deck1_ch[1]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
        deck1_ch[2]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
        deck1_ch[3]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
        deck1_ch[4]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
        deck1_ch[5]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
        deck1_ch[6]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
        deck1_ch[7]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
        deck1_ch[8]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";

        deck1_tr[0]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_black_1668174349-Anima%20Squad.svg";
        deck1_tr[1]="https://cdn.lolchess.gg/upload/images/traits/Brawler_black_1668171507-Brawler.svg";
        deck1_tr[2]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_black_1668174243-LaserCorps.svg";
        deck1_tr[3]="https://cdn.lolchess.gg/upload/images/traits/Recon_black_1668171579-Recon.svg";
        deck1_tr[4]="https://cdn.lolchess.gg/upload/images/traits/Ace_black_1668171455-Ace.svg";

        deck2_ch[0]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg";
        deck2_ch[1]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
        deck2_ch[2]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
        deck2_ch[3]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
        deck2_ch[4]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
        deck2_ch[5]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
        deck2_ch[6]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
        deck2_ch[7]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
   
        deck2_tr[0]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_black_1668174304-Mecha%20_%20PRIME.svg";
        deck2_tr[1]="https://cdn.lolchess.gg/upload/images/traits/Ace_black_1668171455-Ace.svg";
        deck2_tr[2]="https://cdn.lolchess.gg/upload/images/traits/Defender_black_1668171540-Defender.svg";

        deck3_ch[0]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg";
        deck3_ch[1]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
        deck3_ch[2]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
        deck3_ch[3]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
        deck3_ch[4]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
        deck3_ch[5]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg";
        deck3_ch[6]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
        deck3_ch[7]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";

        deck3_tr[0]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_black_1668174304-Mecha%20_%20PRIME.svg";
        deck3_tr[1]="https://cdn.lolchess.gg/upload/images/traits/Renegade_black_1668171599-Renegade.svg";
        deck3_tr[2]="https://cdn.lolchess.gg/upload/images/traits/OxForce_black_1668174382-Ox%20Force.svg";
        deck3_tr[3]="https://cdn.lolchess.gg/upload/images/traits/Aegis_black_1668171475-Aegis.svg";
        deck3_tr[4]="https://cdn.lolchess.gg/upload/images/traits/Defender_black_1668171540-Defender.svg";
        deck3_tr[5]="https://cdn.lolchess.gg/upload/images/traits/Brawler_black_1668171507-Brawler.svg";
        deck3_tr[6]="https://cdn.lolchess.gg/upload/images/traits/Ace_black_1668171455-Ace.svg";

        deck4_ch[0]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
        deck4_ch[1]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
        deck4_ch[2]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
        deck4_ch[3]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
        deck4_ch[4]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
        deck4_ch[5]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
        deck4_ch[6]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
        deck4_ch[7]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
        deck4_ch[8]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";

        deck4_tr[0]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_black_1668171615-Sureshot.svg";
        deck4_tr[1]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_black_1668169947-Arsenal.svg";
        deck4_tr[2]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_black_1668174295-Forecaster.svg";
        deck4_tr[3]="https://cdn.lolchess.gg/upload/images/traits/Brawler_black_1668171507-Brawler.svg";
        deck4_tr[4]="https://cdn.lolchess.gg/upload/images/traits/Civilian_black_1668174354-Civillan.svg";
        deck4_tr[5]="https://cdn.lolchess.gg/upload/images/traits/Ace_black_1668171455-Ace.svg";

        deck5_ch[0]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
        deck5_ch[1]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
        deck5_ch[2]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
        deck5_ch[3]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
        deck5_ch[4]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
        deck5_ch[5]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
        deck5_ch[6]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
        deck5_ch[7]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg";

        deck5_tr[0]="https://cdn.lolchess.gg/upload/images/traits/Underground_black_1668174378-Underground.svg";
        deck5_tr[1]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_black_1668174243-LaserCorps.svg";
        deck5_tr[2]="https://cdn.lolchess.gg/upload/images/traits/Brawler_black_1668171507-Brawler.svg";
        deck5_tr[3]="https://cdn.lolchess.gg/upload/images/traits/Duelist_black_1668171631-Duelist.svg";
        deck5_tr[4]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_black_1668171615-Sureshot.svg";
        deck5_tr[5]="https://cdn.lolchess.gg/upload/images/traits/Ace_black_1668171455-Ace.svg";

        res.render('deck',{
          title: 'Your TFT.GG?',
          c_deck1ch: deck1_ch,
          c_deck1tr: deck1_tr,
          c_deck2ch: deck2_ch,
          c_deck2tr: deck2_tr,
          c_deck3ch: deck3_ch,
          c_deck3tr: deck3_tr,
          c_deck4ch: deck4_ch,
          c_deck4tr: deck4_tr,
          c_deck5ch: deck5_ch,
          c_deck5tr: deck5_tr,
        })
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

            var trait_id2=new Array();
            var char_id2=new Array();
            var char_img2=new Array();
            var trait_img2=new Array();

            var trait_id3=new Array();
            var char_id3=new Array();
            var char_img3=new Array();
            var trait_img3=new Array();

            var trait_id4=new Array();
            var char_id4=new Array();
            var char_img4=new Array();
            var trait_img4=new Array();

            var trait_id5=new Array();
            var char_id5=new Array();
            var char_img5=new Array();
            var trait_img5=new Array();

            var info_champ_json = JSON.parse(body);
            var champ_point = new Array();
            var champ_id = new Array();
            var champ_name = new Array();
            var rotation_name = new Array();
            var champ_pic = new Array();
            var rotation_pic =new Array();
            var ch_name = new Array();
            var ch_leaguePoints = new Array();
            var ch_losses =new Array();
            var ch_wins =new Array();
            var placement = new Array();
    
        //console.log("\n\ninfo_champ_json\n\n", info_champ_json);
    
            // status code가 200이 아니면 종료.
           
    
            var rotationUrl = "https://kr.api.riotgames.com/lol/platform/v4/champion-rotations?api_key="+apikey;
            request(rotationUrl,function(error,response,body){
              var info_rotation = JSON.parse(body);
              var keys = Object.keys(info_rotation);

            var staticUrl = "http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json";
            request(staticUrl,function(error,response,body){
              
              var challengerplayer = "https://kr.api.riotgames.com/tft/league/v1/entries/PLATINUM/II?page=1&api_key=" + apikey;
              request(challengerplayer,function(error,response,body){
                
                var info_challenger_player =JSON.parse(body);
                for(var i = 0;i<10;i++){
        
                  ch_name[i] = info_challenger_player[i]["summonerName"];
                  ch_wins[i] = info_challenger_player[i]["wins"];
                  ch_losses[i] = info_challenger_player[i]["losses"];
                  ch_leaguePoints[i] = info_challenger_player[i]["leaguePoints"];
                }
                
                
  
              var userLeagueUrl = "https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/"+ urlenconde(id)+"?api_key=" + apikey;
              request(userLeagueUrl,function(error,response,body){
                var info_user_league_json = JSON.parse(body);
                
                if(info_user_league_json[0] != null){
                    var leagueId = info_user_league_json[0]["leagueId"];
                    var wins = info_user_league_json[0]["wins"];
                    var losses = info_user_league_json[0]["losses"];
                    var leagueName = info_user_league_json[0]["leagueName"]
                    var tier = info_user_league_json[0]["tier"];
                    var rank = info_user_league_json[0]["rank"];
                    var leaguePoints = info_user_league_json[0]["leaguePoints"];
                    var img_tier;
                    console.log(info_user_league_json)
                    if(tier == "MASTER"){
                    img_tier = "https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415908615571/Master_Emblem_2022.png";
                    }else if(tier == "CHALLENGER"){
                    img_tier = "https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415894930323/Challenger_Emblem_2022.png";
                    }else if(tier == "DIAMOND"){
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/diamond.png?image=q_auto,f_webp,w_144&v=1669867000997"
                    }else if(tier == "PLATINUM"){
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/platinum.png?image=q_auto,f_webp,w_144&v=1669867001194"
                    }else if(tier == "GRANDMASTER"){
                    img_tier = "https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415916978067/Grandmaster_Emblem_2022.png"
                    }else if(tier == "GOLD"){
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/gold.png?image=q_auto,f_webp,w_144&v=1669867000997"
                    }else if(tier == "SILVER"){
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1669867001194"
                    }else if(tier == "BRONZE"){
                    img_tier ="https://opgg-static.akamaized.net/images/medals_new/bronze.png?image=q_auto,f_webp,w_144&v=1669867000997"
                    }
                    else if(tier=="IRON"){
                      img_tier="https://opgg-static.akamaized.net/images/medals_new/iron.png?image=q_auto,f_webp,w_144&v=1669867001194"
                    }else{
                      img_tier = "https://cdn.lolchess.gg/images/lol/tier/provisional.png"
                    }
                }
             var userMatchUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/"+urlenconde(puuid)+"/ids?start=0&count=20&api_key="+apikey;
             request(userMatchUrl,function(error,response,body){
                var info_match=JSON.parse(body);
                var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[0]) + "?api_key=" +apikey;
                  
                request(userGameUrl,function(error,response,body){
                    var info_game = JSON.parse(body);
                    var k=0;
                    for(var j=0;j<8;j++){
                      if(info_game["info"]["participants"][j]["puuid"]==puuid){
                        placement[0] = info_game["info"]["participants"][j]["placement"];
                        for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                    
                          trait_id[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                               
                        }
                        for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                          char_id[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                        }
                            
                      }
                    }
                    
                    for(var i=0;i<char_id.length;i++){
                      
                      if(char_id[i]=="Alistar"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Alistar_1668168617-Alistar.jpg";
                      }
                      else if(char_id[i]=="Annie"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Annie_1668168621-Annie.jpg";
                      }
                      else if(char_id[i]=="Aphelios"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
                      }
                      else if(char_id[i]=="AurelionSol"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1668168606-AurelionSol.jpg";
                      }
                      else if(char_id[i]=="Ashe"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
                      }
                      else if(char_id[i]=="BelVeth"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Belveth_1668168473-BelVeth.jpg";
                      }
                      else if(char_id[i]=="Blitzcrank"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1668168485-Blitzcrank.jpg";
                      }
                      else if(char_id[i]=="Camille"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Camille_1668168802-Camille.jpg";
                      }
                      else if(char_id[i]=="Chogath"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Chogath_1668168795-Chogath.jpg";
                      }
                      else if(char_id[i]=="Draven"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
                      }
                      else if(char_id[i]=="Ekko"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Ekko_1668168638-Ekko.jpg";
                      }
                      else if(char_id[i]=="Ezreal"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
                      }
                      else if(char_id[i]=="Fiddlestick"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Fiddlesticks_1668168825-Fiddlesticks.jpg";
                      }
                      else if(char_id[i]=="Fiora"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Fiora_1668168836-Fiora.jpg";
                      }
                      else if(char_id[i]=="Galio"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Galio_1668167832-Galio.jpg";
                      }
                      else if(char_id[i]=="Gangplank"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Gangplank_1668167844-Gangplank.jpg";
                      }
                      else if(char_id[i]=="Janna"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";
                      }
                      else if(char_id[i]=="Jax"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
                      }
                      else if(char_id[i]=="Jinx"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
                      }
                      else if(char_id[i]=="Kaisa"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1668168711-Kaisa.jpg";
                      }
                      else if(char_id[i]=="Kayle"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
                      }
                      else if(char_id[i]=="Leblanc"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Leblanc_1668168381-Leblanc.jpg";
                      }
                      else if(char_id[i]=="LeeSin"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
                      }
                      else if(char_id[i]=="Leona"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
                      }
                      else if(char_id[i]=="Lulu"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Lulu_1668168372-Lulu.jpg";
                      }
                      else if(char_id[i]=="Lux"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1668167927-Lux.jpg";
                      }
                      else if(char_id[i]=="Malphite"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1668168421-Malphite.jpg";
                      }
                      else if(char_id[i]=="MissFortune"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
                      }
                      else if(char_id[i]=="Mordekaiser"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
                      }
                      else if(char_id[i]=="Nasus"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg";
                      }
                      else if(char_id[i]=="Nilah"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nilah_1668167902-Nilah.jpg";
                      }
                      else if(char_id[i]=="Nunu"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1668167875-Nunu.jpg";
                      }
                      else if(char_id[i]=="Poppy"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Poppy_1668168526-Poppy.jpg";
                      }
                      else if(char_id[i]=="Rammus"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Rammus_1668167920-Rammus.jpg";
                      }
                      else if(char_id[i]=="Rell"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1668168355-Rell.jpg";
                      }
                      else if(char_id[i]=="Renekton"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
                      }
                      else if(char_id[i]=="Riven"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
                      }
                      else if(char_id[i]=="Samira"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
                      }
                      else if(char_id[i]=="Sejuani"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
                      }
                      else if(char_id[i]=="Senna"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
                      }
                      else if(char_id[i]=="Sett"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
                      }
                      else if(char_id[i]=="Sivir"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
                      }
                      else if(char_id[i]=="Sona"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
                      }
                      else if(char_id[i]=="Soraka"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Soraka_1668168584-Soraka.jpg";
                      }
                      else if(char_id[i]=="Sylas"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1668168543-Sylas.jpg";
                      }
                      else if(char_id[i]=="Syndra"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Syndra_1668168599-Syndra.jpg";
                      }
                      else if(char_id[i]=="Taliyah"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1668168820-Taliyah.jpg";
                      }
                      else if(char_id[i]=="Talon"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
                      }
                      else if(char_id[i]=="Urgot"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Urgot_1668168652-Urgot.jpg";
                      }
                      else if(char_id[i]=="Vayne"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
                      }
                      else if(char_id[i]=="Velkoz"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Velkoz_1668168479-Velkoz.jpg";
                      }
                      else if(char_id[i]=="Vi"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
                      }
                      else if(char_id[i]=="Viego"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg"
                      }
                      else if(char_id[i]=="WuKong"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg"
                      }
                      else if(char_id[i]=="Yasuo"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1668168633-Yasuo.jpg";
                      }
                      else if(char_id[i]=="Yuumi"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Yuumi_1668168657-Yuumi.jpg";
                      }
                      else if(char_id[i]=="Zac"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1668168679-Zac.jpg"
                      }
                      else if(char_id[i]=="Zed"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg"
                      }
                      else if(char_id[i]=="Zoe"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1668168742-Zoe.jpg"
                      }
                    }


                    for(var i=0;i<trait_id.length;i++){
           
                      if(trait_id[i]=="Admin"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/ADMIN_normal_1668171639-A.D.M.I.N..svg";
                      }
                      else if(trait_id[i]=="AnimaSquad"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_normal_1668171609-Anima%20Squad.svg";
                      }
                      else if(trait_id[i]=="Arsenal"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_normal_1668170415-Arsenal.svg"
                      }
                      else if(trait_id[i]=="Civilian"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Civilian_normal_1668171622-Civillan.svg"
                      }
                      else if(trait_id[i]=="Gadgeteen"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Gadgeteen_normal_1668171603-Gadgeteen.svg";
                      }
                      else if(trait_id[i]=="LaserCorps"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_normal_1668171618-LaserCorps.svg"
                      }
                      else if(trait_id[i]=="ExoPrime"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_normal_1668171595-Mecha%20_%20PRIME.svg";
                      }
                      else if(trait_id[i]=="OxForce"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/OxForce_normal_1668171649-Ox%20Force.svg";
                      }
                      else if(trait_id[i]=="StarGuardian"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/StarGuardian_normal_1668171627-Star%20Guardian.svg"
                      }
                      else if(trait_id[i]=="Supers"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Supers_normal_1668171631-Supers.svg"
                      }
                      else if(trait_id[i]=="Threat"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Threat_normal_1668171635-Threat.svg"
                      }
                      else if(trait_id[i]=="Underground"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Underground_normal_1668171645-Underground.svg"
                      }
                      else if(trait_id[i]=="Ace"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Ace_normal_1668171455-Ace.svg"
                      }
                      else if(trait_id[i]=="Aegis"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Aegis_normal_1668171474-Aegis.svg"
                      }
                      else if(trait_id[i]=="Brawler"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Brawler_normal_1668171507-Brawler.svg"
                      }
                      else if(trait_id[i]=="Corrupted"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Corrupted_normal_1668171552-Corrupted.svg"
                      }
                      else if(trait_id[i]=="Defender"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Defender_normal_1668171540-Defender.svg"
                      }
                      else if(trait_id[i]=="Duelist"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Duelist_normal_1668171631-Duelist.svg"
                      }
                      else if(trait_id[i]=="Forecaster"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_normal_1668171558-Forecaster.svg";
                      }
                      else if(trait_id[i]=="Hacker"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Hacker_normal_1668171706-Hacker.svg";
                      }
                      else if(trait_id[i]=="Heart"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Heart_normal_1668171662-Heart.svg";
                      }
                      else if(trait_id[i]=="Mascot"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Mascot_normal_1668171647-Mascot.svg";
                      }
                      else if(trait_id[i]=="Prankster"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Prankster_normal_1668171562-Prankster.svg";
                      }
                      else if(trait_id[i]=="Recon"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Recon_normal_1668171579-Recon.svg";
                      }
                      else if(trait_id[i]=="Renegade"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Renegade_normal_1668171599-Renegade.svg";
                      }
                      else if(trait_id[i]=="Spellslinger"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Spellslinger_normal_1668171686-Spellslinger.svg";
                      }
                      else if(trait_id[i]=="Sureshot"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_normal_1668171615-Sureshot.svg";
                      }
                      else{
                        trait_img[i]= "a";
                      }
                    }

                    var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[1]) + "?api_key=" +apikey;
                  
                request(userGameUrl,function(error,response,body){
                    var info_game = JSON.parse(body);
  
                    for(var j=0;j<8;j++){
                      if(info_game["info"]["participants"][j]["puuid"]==puuid){
                        placement[1] = info_game["info"]["participants"][j]["placement"];
                        for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                          trait_id2[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                        }
                        for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                          char_id2[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                        }
                            
                      }
                    }
                    for(var i=0;i<char_id2.length;i++){
                     
                      if(char_id2[i]=="Alistar"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Alistar_1668168617-Alistar.jpg";
                      }
                      else if(char_id2[i]=="Annie"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Annie_1668168621-Annie.jpg";
                      }
                      else if(char_id2[i]=="Aphelios"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
                      }
                      else if(char_id2[i]=="AurelionSol"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1668168606-AurelionSol.jpg";
                      }
                      else if(char_id2[i]=="Ashe"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
                      }
                      else if(char_id2[i]=="BelVeth"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Belveth_1668168473-BelVeth.jpg";
                      }
                      else if(char_id2[i]=="Blitzcrank"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1668168485-Blitzcrank.jpg";
                      }
                      else if(char_id2[i]=="Camille"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Camille_1668168802-Camille.jpg";
                      }
                      else if(char_id2[i]=="Chogath"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Chogath_1668168795-Chogath.jpg";
                      }
                      else if(char_id2[i]=="Draven"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
                      }
                      else if(char_id2[i]=="Ekko"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Ekko_1668168638-Ekko.jpg";
                      }
                      else if(char_id2[i]=="Ezreal"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
                      }
                      else if(char_id2[i]=="Fiddlestick"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Fiddlesticks_1668168825-Fiddlesticks.jpg";
                      }
                      else if(char_id2[i]=="Fiora"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Fiora_1668168836-Fiora.jpg";
                      }
                      else if(char_id2[i]=="Galio"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Galio_1668167832-Galio.jpg";
                      }
                      else if(char_id2[i]=="Gangplank"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Gangplank_1668167844-Gangplank.jpg";
                      }
                      else if(char_id2[i]=="Janna"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";
                      }
                      else if(char_id2[i]=="Jax"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
                      }
                      else if(char_id2[i]=="Jinx"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
                      }
                      else if(char_id2[i]=="Kaisa"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1668168711-Kaisa.jpg";
                      }
                      else if(char_id2[i]=="Kayle"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
                      }
                      else if(char_id2[i]=="Leblanc"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Leblanc_1668168381-Leblanc.jpg";
                      }
                      else if(char_id2[i]=="LeeSin"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
                      }
                      else if(char_id2[i]=="Leona"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
                      }
                      else if(char_id2[i]=="Lulu"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Lulu_1668168372-Lulu.jpg";
                      }
                      else if(char_id2[i]=="Lux"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1668167927-Lux.jpg";
                      }
                      else if(char_id2[i]=="Malphite"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1668168421-Malphite.jpg";
                      }
                      else if(char_id2[i]=="MissFortune"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
                      }
                      else if(char_id2[i]=="Mordekaiser"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
                      }
                      else if(char_id2[i]=="Nasus"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg";
                      }
                      else if(char_id2[i]=="Nilah"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nilah_1668167902-Nilah.jpg";
                      }
                      else if(char_id2[i]=="Nunu"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1668167875-Nunu.jpg";
                      }
                      else if(char_id2[i]=="Poppy"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Poppy_1668168526-Poppy.jpg";
                      }
                      else if(char_id2[i]=="Rammus"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Rammus_1668167920-Rammus.jpg";
                      }
                      else if(char_id2[i]=="Rell"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1668168355-Rell.jpg";
                      }
                      else if(char_id2[i]=="Renekton"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
                      }
                      else if(char_id2[i]=="Riven"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
                      }
                      else if(char_id2[i]=="Samira"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
                      }
                      else if(char_id2[i]=="Sejuani"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
                      }
                      else if(char_id2[i]=="Senna"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
                      }
                      else if(char_id2[i]=="Sett"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
                      }
                      else if(char_id2[i]=="Sivir"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
                      }
                      else if(char_id2[i]=="Sona"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
                      }
                      else if(char_id2[i]=="Soraka"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Soraka_1668168584-Soraka.jpg";
                      }
                      else if(char_id2[i]=="Sylas"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1668168543-Sylas.jpg";
                      }
                      else if(char_id2[i]=="Syndra"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Syndra_1668168599-Syndra.jpg";
                      }
                      else if(char_id2[i]=="Taliyah"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1668168820-Taliyah.jpg";
                      }
                      else if(char_id2[i]=="Talon"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
                      }
                      else if(char_id2[i]=="Urgot"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Urgot_1668168652-Urgot.jpg";
                      }
                      else if(char_id2[i]=="Vayne"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
                      }
                      else if(char_id2[i]=="Velkoz"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Velkoz_1668168479-Velkoz.jpg";
                      }
                      else if(char_id2[i]=="Vi"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
                      }
                      else if(char_id2[i]=="Viego"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg"
                      }
                      else if(char_id2[i]=="WuKong"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg"
                      }
                      else if(char_id2[i]=="Yasuo"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1668168633-Yasuo.jpg";
                      }
                      else if(char_id2[i]=="Yuumi"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Yuumi_1668168657-Yuumi.jpg";
                      }
                      else if(char_id2[i]=="Zac"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1668168679-Zac.jpg"
                      }
                      else if(char_id2[i]=="Zed"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg"
                      }
                      else if(char_id2[i]=="Zoe"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1668168742-Zoe.jpg"
                      }
                    }


                    for(var i=0;i<trait_id2.length;i++){
           
                      if(trait_id2[i]=="Admin"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/ADMIN_normal_1668171639-A.D.M.I.N..svg";
                      }
                      else if(trait_id2[i]=="AnimaSquad"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_normal_1668171609-Anima%20Squad.svg";
                      }
                      else if(trait_id2[i]=="Arsenal"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_normal_1668170415-Arsenal.svg"
                      }
                      else if(trait_id2[i]=="Civilian"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Civilian_normal_1668171622-Civillan.svg"
                      }
                      else if(trait_id2[i]=="Gadgeteen"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Gadgeteen_normal_1668171603-Gadgeteen.svg";
                      }
                      else if(trait_id2[i]=="LaserCorps"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_normal_1668171618-LaserCorps.svg"
                      }
                      else if(trait_id2[i]=="ExoPrime"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_normal_1668171595-Mecha%20_%20PRIME.svg";
                      }
                      else if(trait_id2[i]=="OxForce"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/OxForce_normal_1668171649-Ox%20Force.svg";
                      }
                      else if(trait_id2[i]=="StarGuardian"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/StarGuardian_normal_1668171627-Star%20Guardian.svg"
                      }
                      else if(trait_id2[i]=="Supers"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Supers_normal_1668171631-Supers.svg"
                      }
                      else if(trait_id2[i]=="Threat"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Threat_normal_1668171635-Threat.svg"
                      }
                      else if(trait_id2[i]=="Underground"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Underground_normal_1668171645-Underground.svg"
                      }
                      else if(trait_id2[i]=="Ace"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Ace_normal_1668171455-Ace.svg"
                      }
                      else if(trait_id2[i]=="Aegis"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Aegis_normal_1668171474-Aegis.svg"
                      }
                      else if(trait_id2[i]=="Brawler"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Brawler_normal_1668171507-Brawler.svg"
                      }
                      else if(trait_id2[i]=="Corrupted"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Corrupted_normal_1668171552-Corrupted.svg"
                      }
                      else if(trait_id2[i]=="Defender"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Defender_normal_1668171540-Defender.svg"
                      }
                      else if(trait_id2[i]=="Duelist"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Duelist_normal_1668171631-Duelist.svg"
                      }
                      else if(trait_id2[i]=="Forecaster"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_normal_1668171558-Forecaster.svg";
                      }
                      else if(trait_id2[i]=="Hacker"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Hacker_normal_1668171706-Hacker.svg";
                      }
                      else if(trait_id2[i]=="Heart"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Heart_normal_1668171662-Heart.svg";
                      }
                      else if(trait_id2[i]=="Mascot"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Mascot_normal_1668171647-Mascot.svg";
                      }
                      else if(trait_id2[i]=="Prankster"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Prankster_normal_1668171562-Prankster.svg";
                      }
                      else if(trait_id2[i]=="Recon"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Recon_normal_1668171579-Recon.svg";
                      }
                      else if(trait_id2[i]=="Renegade"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Renegade_normal_1668171599-Renegade.svg";
                      }
                      else if(trait_id2[i]=="Spellslinger"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Spellslinger_normal_1668171686-Spellslinger.svg";
                      }
                      else if(trait_id2[i]=="Sureshot"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_normal_1668171615-Sureshot.svg";
                      }
                      else{
                        trait_img2[i]= "a";
                      }
                    }

                    var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[2]) + "?api_key=" +apikey;
                  
                    request(userGameUrl,function(error,response,body){
                        var info_game = JSON.parse(body);
      
                        for(var j=0;j<8;j++){
                          if(info_game["info"]["participants"][j]["puuid"]==puuid){
                            placement[2] = info_game["info"]["participants"][j]["placement"];
                            for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                              trait_id3[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                            }
                            for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                              char_id3[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                            }
                                
                          }
                        }
                        

                        for(var i=0;i<char_id3.length;i++){
                          
                          if(char_id3[i]=="Alistar"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Alistar_1668168617-Alistar.jpg";
                          }
                          else if(char_id3[i]=="Annie"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Annie_1668168621-Annie.jpg";
                          }
                          else if(char_id3[i]=="Aphelios"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
                          }
                          else if(char_id3[i]=="AurelionSol"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1668168606-AurelionSol.jpg";
                          }
                          else if(char_id3[i]=="Ashe"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
                          }
                          else if(char_id3[i]=="BelVeth"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Belveth_1668168473-BelVeth.jpg";
                          }
                          else if(char_id3[i]=="Blitzcrank"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1668168485-Blitzcrank.jpg";
                          }
                          else if(char_id3[i]=="Camille"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Camille_1668168802-Camille.jpg";
                          }
                          else if(char_id3[i]=="Chogath"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Chogath_1668168795-Chogath.jpg";
                          }
                          else if(char_id3[i]=="Draven"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
                          }
                          else if(char_id3[i]=="Ekko"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Ekko_1668168638-Ekko.jpg";
                          }
                          else if(char_id3[i]=="Ezreal"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
                          }
                          else if(char_id3[i]=="Fiddlestick"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Fiddlesticks_1668168825-Fiddlesticks.jpg";
                          }
                          else if(char_id3[i]=="Fiora"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Fiora_1668168836-Fiora.jpg";
                          }
                          else if(char_id3[i]=="Galio"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Galio_1668167832-Galio.jpg";
                          }
                          else if(char_id3[i]=="Gangplank"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Gangplank_1668167844-Gangplank.jpg";
                          }
                          else if(char_id3[i]=="Janna"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";
                          }
                          else if(char_id3[i]=="Jax"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
                          }
                          else if(char_id3[i]=="Jinx"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
                          }
                          else if(char_id3[i]=="Kaisa"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1668168711-Kaisa.jpg";
                          }
                          else if(char_id3[i]=="Kayle"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
                          }
                          else if(char_id3[i]=="Leblanc"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Leblanc_1668168381-Leblanc.jpg";
                          }
                          else if(char_id3[i]=="LeeSin"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
                          }
                          else if(char_id3[i]=="Leona"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
                          }
                          else if(char_id3[i]=="Lulu"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Lulu_1668168372-Lulu.jpg";
                          }
                          else if(char_id3[i]=="Lux"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1668167927-Lux.jpg";
                          }
                          else if(char_id3[i]=="Malphite"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1668168421-Malphite.jpg";
                          }
                          else if(char_id3[i]=="MissFortune"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
                          }
                          else if(char_id3[i]=="Mordekaiser"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
                          }
                          else if(char_id3[i]=="Nasus"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg";
                          }
                          else if(char_id3[i]=="Nilah"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nilah_1668167902-Nilah.jpg";
                          }
                          else if(char_id3[i]=="Nunu"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1668167875-Nunu.jpg";
                          }
                          else if(char_id3[i]=="Poppy"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Poppy_1668168526-Poppy.jpg";
                          }
                          else if(char_id3[i]=="Rammus"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Rammus_1668167920-Rammus.jpg";
                          }
                          else if(char_id3[i]=="Rell"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1668168355-Rell.jpg";
                          }
                          else if(char_id3[i]=="Renekton"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
                          }
                          else if(char_id3[i]=="Riven"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
                          }
                          else if(char_id3[i]=="Samira"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
                          }
                          else if(char_id3[i]=="Sejuani"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
                          }
                          else if(char_id3[i]=="Senna"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
                          }
                          else if(char_id3[i]=="Sett"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
                          }
                          else if(char_id3[i]=="Sivir"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
                          }
                          else if(char_id3[i]=="Sona"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
                          }
                          else if(char_id3[i]=="Soraka"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Soraka_1668168584-Soraka.jpg";
                          }
                          else if(char_id3[i]=="Sylas"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1668168543-Sylas.jpg";
                          }
                          else if(char_id3[i]=="Syndra"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Syndra_1668168599-Syndra.jpg";
                          }
                          else if(char_id3[i]=="Taliyah"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1668168820-Taliyah.jpg";
                          }
                          else if(char_id3[i]=="Talon"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
                          }
                          else if(char_id3[i]=="Urgot"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Urgot_1668168652-Urgot.jpg";
                          }
                          else if(char_id3[i]=="Vayne"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
                          }
                          else if(char_id3[i]=="Velkoz"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Velkoz_1668168479-Velkoz.jpg";
                          }
                          else if(char_id3[i]=="Vi"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
                          }
                          else if(char_id3[i]=="Viego"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg"
                          }
                          else if(char_id3[i]=="WuKong"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg"
                          }
                          else if(char_id3[i]=="Yasuo"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1668168633-Yasuo.jpg";
                          }
                          else if(char_id3[i]=="Yuumi"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Yuumi_1668168657-Yuumi.jpg";
                          }
                          else if(char_id3[i]=="Zac"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1668168679-Zac.jpg"
                          }
                          else if(char_id3[i]=="Zed"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg"
                          }
                          else if(char_id3[i]=="Zoe"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1668168742-Zoe.jpg"
                          }
                        }
    
    
                        for(var i=0;i<trait_id3.length;i++){
               
                          if(trait_id3[i]=="Admin"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/ADMIN_normal_1668171639-A.D.M.I.N..svg";
                          }
                          else if(trait_id3[i]=="AnimaSquad"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_normal_1668171609-Anima%20Squad.svg";
                          }
                          else if(trait_id3[i]=="Arsenal"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_normal_1668170415-Arsenal.svg"
                          }
                          else if(trait_id3[i]=="Civilian"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Civilian_normal_1668171622-Civillan.svg"
                          }
                          else if(trait_id3[i]=="Gadgeteen"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Gadgeteen_normal_1668171603-Gadgeteen.svg";
                          }
                          else if(trait_id3[i]=="LaserCorps"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_normal_1668171618-LaserCorps.svg"
                          }
                          else if(trait_id3[i]=="ExoPrime"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_normal_1668171595-Mecha%20_%20PRIME.svg";
                          }
                          else if(trait_id3[i]=="OxForce"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/OxForce_normal_1668171649-Ox%20Force.svg";
                          }
                          else if(trait_id3[i]=="StarGuardian"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/StarGuardian_normal_1668171627-Star%20Guardian.svg"
                          }
                          else if(trait_id3[i]=="Supers"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Supers_normal_1668171631-Supers.svg"
                          }
                          else if(trait_id3[i]=="Threat"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Threat_normal_1668171635-Threat.svg"
                          }
                          else if(trait_id3[i]=="Underground"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Underground_normal_1668171645-Underground.svg"
                          }
                          else if(trait_id3[i]=="Ace"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Ace_normal_1668171455-Ace.svg"
                          }
                          else if(trait_id3[i]=="Aegis"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Aegis_normal_1668171474-Aegis.svg"
                          }
                          else if(trait_id3[i]=="Brawler"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Brawler_normal_1668171507-Brawler.svg"
                          }
                          else if(trait_id3[i]=="Corrupted"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Corrupted_normal_1668171552-Corrupted.svg"
                          }
                          else if(trait_id3[i]=="Defender"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Defender_normal_1668171540-Defender.svg"
                          }
                          else if(trait_id3[i]=="Duelist"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Duelist_normal_1668171631-Duelist.svg"
                          }
                          else if(trait_id3[i]=="Forecaster"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_normal_1668171558-Forecaster.svg";
                          }
                          else if(trait_id3[i]=="Hacker"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Hacker_normal_1668171706-Hacker.svg";
                          }
                          else if(trait_id3[i]=="Heart"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Heart_normal_1668171662-Heart.svg";
                          }
                          else if(trait_id3[i]=="Mascot"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Mascot_normal_1668171647-Mascot.svg";
                          }
                          else if(trait_id3[i]=="Prankster"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Prankster_normal_1668171562-Prankster.svg";
                          }
                          else if(trait_id3[i]=="Recon"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Recon_normal_1668171579-Recon.svg";
                          }
                          else if(trait_id3[i]=="Renegade"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Renegade_normal_1668171599-Renegade.svg";
                          }
                          else if(trait_id3[i]=="Spellslinger"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Spellslinger_normal_1668171686-Spellslinger.svg";
                          }
                          else if(trait_id3[i]=="Sureshot"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_normal_1668171615-Sureshot.svg";
                          }
                          else{
                            trait_img3[i]= "a";
                          }
                        }

                        var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[3]) + "?api_key=" +apikey;
                  
                        request(userGameUrl,function(error,response,body){
                            var info_game = JSON.parse(body);
                            
                            for(var j=0;j<8;j++){
                              if(info_game["info"]["participants"][j]["puuid"]==puuid){
                                placement[3] = info_game["info"]["participants"][j]["placement"];
                                for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                                  trait_id4[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                                }
                                for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                                  char_id4[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                                }
                                    
                              }
                            }
                            
    
                            for(var i=0;i<char_id4.length;i++){
                          
                              if(char_id4[i]=="Alistar"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Alistar_1668168617-Alistar.jpg";
                              }
                              else if(char_id4[i]=="Annie"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Annie_1668168621-Annie.jpg";
                              }
                              else if(char_id4[i]=="Aphelios"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
                              }
                              else if(char_id4[i]=="AurelionSol"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1668168606-AurelionSol.jpg";
                              }
                              else if(char_id4[i]=="Ashe"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
                              }
                              else if(char_id4[i]=="BelVeth"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Belveth_1668168473-BelVeth.jpg";
                              }
                              else if(char_id4[i]=="Blitzcrank"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1668168485-Blitzcrank.jpg";
                              }
                              else if(char_id4[i]=="Camille"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Camille_1668168802-Camille.jpg";
                              }
                              else if(char_id4[i]=="Chogath"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Chogath_1668168795-Chogath.jpg";
                              }
                              else if(char_id4[i]=="Draven"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
                              }
                              else if(char_id4[i]=="Ekko"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Ekko_1668168638-Ekko.jpg";
                              }
                              else if(char_id4[i]=="Ezreal"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
                              }
                              else if(char_id4[i]=="Fiddlestick"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Fiddlesticks_1668168825-Fiddlesticks.jpg";
                              }
                              else if(char_id4[i]=="Fiora"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Fiora_1668168836-Fiora.jpg";
                              }
                              else if(char_id4[i]=="Galio"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Galio_1668167832-Galio.jpg";
                              }
                              else if(char_id4[i]=="Gangplank"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Gangplank_1668167844-Gangplank.jpg";
                              }
                              else if(char_id4[i]=="Janna"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";
                              }
                              else if(char_id4[i]=="Jax"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
                              }
                              else if(char_id4[i]=="Jinx"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
                              }
                              else if(char_id4[i]=="Kaisa"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1668168711-Kaisa.jpg";
                              }
                              else if(char_id4[i]=="Kayle"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
                              }
                              else if(char_id4[i]=="Leblanc"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Leblanc_1668168381-Leblanc.jpg";
                              }
                              else if(char_id4[i]=="LeeSin"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
                              }
                              else if(char_id4[i]=="Leona"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
                              }
                              else if(char_id4[i]=="Lulu"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Lulu_1668168372-Lulu.jpg";
                              }
                              else if(char_id4[i]=="Lux"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1668167927-Lux.jpg";
                              }
                              else if(char_id4[i]=="Malphite"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1668168421-Malphite.jpg";
                              }
                              else if(char_id4[i]=="MissFortune"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
                              }
                              else if(char_id4[i]=="Mordekaiser"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
                              }
                              else if(char_id4[i]=="Nasus"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg";
                              }
                              else if(char_id4[i]=="Nilah"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Nilah_1668167902-Nilah.jpg";
                              }
                              else if(char_id4[i]=="Nunu"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1668167875-Nunu.jpg";
                              }
                              else if(char_id4[i]=="Poppy"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Poppy_1668168526-Poppy.jpg";
                              }
                              else if(char_id4[i]=="Rammus"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Rammus_1668167920-Rammus.jpg";
                              }
                              else if(char_id4[i]=="Rell"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1668168355-Rell.jpg";
                              }
                              else if(char_id4[i]=="Renekton"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
                              }
                              else if(char_id4[i]=="Riven"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
                              }
                              else if(char_id4[i]=="Samira"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
                              }
                              else if(char_id4[i]=="Sejuani"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
                              }
                              else if(char_id4[i]=="Senna"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
                              }
                              else if(char_id4[i]=="Sett"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
                              }
                              else if(char_id4[i]=="Sivir"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
                              }
                              else if(char_id4[i]=="Sona"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
                              }
                              else if(char_id4[i]=="Soraka"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Soraka_1668168584-Soraka.jpg";
                              }
                              else if(char_id4[i]=="Sylas"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1668168543-Sylas.jpg";
                              }
                              else if(char_id4[i]=="Syndra"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Syndra_1668168599-Syndra.jpg";
                              }
                              else if(char_id4[i]=="Taliyah"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1668168820-Taliyah.jpg";
                              }
                              else if(char_id4[i]=="Talon"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
                              }
                              else if(char_id4[i]=="Urgot"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Urgot_1668168652-Urgot.jpg";
                              }
                              else if(char_id4[i]=="Vayne"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
                              }
                              else if(char_id4[i]=="Velkoz"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Velkoz_1668168479-Velkoz.jpg";
                              }
                              else if(char_id4[i]=="Vi"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
                              }
                              else if(char_id4[i]=="Viego"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg"
                              }
                              else if(char_id4[i]=="WuKong"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg"
                              }
                              else if(char_id4[i]=="Yasuo"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1668168633-Yasuo.jpg";
                              }
                              else if(char_id4[i]=="Yuumi"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Yuumi_1668168657-Yuumi.jpg";
                              }
                              else if(char_id4[i]=="Zac"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1668168679-Zac.jpg"
                              }
                              else if(char_id4[i]=="Zed"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg"
                              }
                              else if(char_id4[i]=="Zoe"){
                                char_img4[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1668168742-Zoe.jpg"
                              }
                            }
        
        
                            for(var i=0;i<trait_id4.length;i++){
                   
                              if(trait_id4[i]=="Admin"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/ADMIN_normal_1668171639-A.D.M.I.N..svg";
                              }
                              else if(trait_id4[i]=="AnimaSquad"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_normal_1668171609-Anima%20Squad.svg";
                              }
                              else if(trait_id4[i]=="Arsenal"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_normal_1668170415-Arsenal.svg"
                              }
                              else if(trait_id4[i]=="Civilian"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Civilian_normal_1668171622-Civillan.svg"
                              }
                              else if(trait_id4[i]=="Gadgeteen"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Gadgeteen_normal_1668171603-Gadgeteen.svg";
                              }
                              else if(trait_id4[i]=="LaserCorps"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_normal_1668171618-LaserCorps.svg"
                              }
                              else if(trait_id4[i]=="ExoPrime"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_normal_1668171595-Mecha%20_%20PRIME.svg";
                              }
                              else if(trait_id4[i]=="OxForce"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/OxForce_normal_1668171649-Ox%20Force.svg";
                              }
                              else if(trait_id4[i]=="StarGuardian"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/StarGuardian_normal_1668171627-Star%20Guardian.svg"
                              }
                              else if(trait_id4[i]=="Supers"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Supers_normal_1668171631-Supers.svg"
                              }
                              else if(trait_id4[i]=="Threat"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Threat_normal_1668171635-Threat.svg"
                              }
                              else if(trait_id4[i]=="Underground"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Underground_normal_1668171645-Underground.svg"
                              }
                              else if(trait_id4[i]=="Ace"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Ace_normal_1668171455-Ace.svg"
                              }
                              else if(trait_id4[i]=="Aegis"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Aegis_normal_1668171474-Aegis.svg"
                              }
                              else if(trait_id4[i]=="Brawler"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Brawler_normal_1668171507-Brawler.svg"
                              }
                              else if(trait_id4[i]=="Corrupted"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Corrupted_normal_1668171552-Corrupted.svg"
                              }
                              else if(trait_id4[i]=="Defender"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Defender_normal_1668171540-Defender.svg"
                              }
                              else if(trait_id4[i]=="Duelist"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Duelist_normal_1668171631-Duelist.svg"
                              }
                              else if(trait_id4[i]=="Forecaster"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_normal_1668171558-Forecaster.svg";
                              }
                              else if(trait_id4[i]=="Hacker"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Hacker_normal_1668171706-Hacker.svg";
                              }
                              else if(trait_id4[i]=="Heart"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Heart_normal_1668171662-Heart.svg";
                              }
                              else if(trait_id4[i]=="Mascot"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Mascot_normal_1668171647-Mascot.svg";
                              }
                              else if(trait_id4[i]=="Prankster"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Prankster_normal_1668171562-Prankster.svg";
                              }
                              else if(trait_id4[i]=="Recon"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Recon_normal_1668171579-Recon.svg";
                              }
                              else if(trait_id4[i]=="Renegade"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Renegade_normal_1668171599-Renegade.svg";
                              }
                              else if(trait_id4[i]=="Spellslinger"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Spellslinger_normal_1668171686-Spellslinger.svg";
                              }
                              else if(trait_id4[i]=="Sureshot"){
                                trait_img4[i]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_normal_1668171615-Sureshot.svg";
                              }
                              else{
                                trait_img4[i]= "a";
                              }
                            }

                            var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[4]) + "?api_key=" +apikey;
                  
                            request(userGameUrl,function(error,response,body){
                                var info_game = JSON.parse(body);
              
                                for(var j=0;j<8;j++){
                                  if(info_game["info"]["participants"][j]["puuid"]==puuid){
                                    placement[4] = info_game["info"]["participants"][j]["placement"];
                                    for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                                      trait_id5[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                                    }
                                    for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                                      char_id5[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                                    }
                                        
                                  }
                                }
                                
        
                                for(var i=0;i<char_id5.length;i++){
                              
                                  if(char_id5[i]=="Alistar"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Alistar_1668168617-Alistar.jpg";
                                  }
                                  else if(char_id5[i]=="Annie"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Annie_1668168621-Annie.jpg";
                                  }
                                  else if(char_id5[i]=="Aphelios"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1668168612-Aphelios.jpg";
                                  }
                                  else if(char_id5[i]=="AurelionSol"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1668168606-AurelionSol.jpg";
                                  }
                                  else if(char_id5[i]=="Ashe"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Ashe_1668168626-Ashe.jpg";
                                  }
                                  else if(char_id5[i]=="BelVeth"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Belveth_1668168473-BelVeth.jpg";
                                  }
                                  else if(char_id5[i]=="Blitzcrank"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1668168485-Blitzcrank.jpg";
                                  }
                                  else if(char_id5[i]=="Camille"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Camille_1668168802-Camille.jpg";
                                  }
                                  else if(char_id5[i]=="Chogath"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Chogath_1668168795-Chogath.jpg";
                                  }
                                  else if(char_id5[i]=="Draven"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Draven_1668167910-Draven.jpg";
                                  }
                                  else if(char_id5[i]=="Ekko"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Ekko_1668168638-Ekko.jpg";
                                  }
                                  else if(char_id5[i]=="Ezreal"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1668168667-Ezreal.jpg";
                                  }
                                  else if(char_id5[i]=="Fiddlestick"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Fiddlesticks_1668168825-Fiddlesticks.jpg";
                                  }
                                  else if(char_id5[i]=="Fiora"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Fiora_1668168836-Fiora.jpg";
                                  }
                                  else if(char_id5[i]=="Galio"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Galio_1668167832-Galio.jpg";
                                  }
                                  else if(char_id5[i]=="Gangplank"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Gangplank_1668167844-Gangplank.jpg";
                                  }
                                  else if(char_id5[i]=="Janna"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Janna_1668168692-Janna.jpg";
                                  }
                                  else if(char_id5[i]=="Jax"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1668168698-Jax.jpg";
                                  }
                                  else if(char_id5[i]=="Jinx"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Jinx_1668168788-Jinx.jpg";
                                  }
                                  else if(char_id5[i]=="Kaisa"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1668168711-Kaisa.jpg";
                                  }
                                  else if(char_id5[i]=="Kayle"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Kayle_1668168735-Kayle.jpg";
                                  }
                                  else if(char_id5[i]=="Leblanc"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Leblanc_1668168381-Leblanc.jpg";
                                  }
                                  else if(char_id5[i]=="LeeSin"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1668168399-LeeSin.jpg";
                                  }
                                  else if(char_id5[i]=="Leona"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1668167945-Leona.jpg";
                                  }
                                  else if(char_id5[i]=="Lulu"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Lulu_1668168372-Lulu.jpg";
                                  }
                                  else if(char_id5[i]=="Lux"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1668167927-Lux.jpg";
                                  }
                                  else if(char_id5[i]=="Malphite"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1668168421-Malphite.jpg";
                                  }
                                  else if(char_id5[i]=="MissFortune"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/MissFortune_1668168442-MissFortune.jpg";
                                  }
                                  else if(char_id5[i]=="Mordekaiser"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1668168435-Mordekaiser.jpg";
                                  }
                                  else if(char_id5[i]=="Nasus"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1668167855-Nasus.jpg";
                                  }
                                  else if(char_id5[i]=="Nilah"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Nilah_1668167902-Nilah.jpg";
                                  }
                                  else if(char_id5[i]=="Nunu"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1668167875-Nunu.jpg";
                                  }
                                  else if(char_id5[i]=="Poppy"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Poppy_1668168526-Poppy.jpg";
                                  }
                                  else if(char_id5[i]=="Rammus"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Rammus_1668167920-Rammus.jpg";
                                  }
                                  else if(char_id5[i]=="Rell"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1668168355-Rell.jpg";
                                  }
                                  else if(char_id5[i]=="Renekton"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Renekton_1668167936-Renekton.jpg";
                                  }
                                  else if(char_id5[i]=="Riven"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Riven_1668168390-Riven.jpg";
                                  }
                                  else if(char_id5[i]=="Samira"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Samira_1668168533-Samira.jpg";
                                  }
                                  else if(char_id5[i]=="Sejuani"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1668168560-Sejuani.jpg";
                                  }
                                  else if(char_id5[i]=="Senna"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1668168549-Senna.jpg";
                                  }
                                  else if(char_id5[i]=="Sett"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1668168568-Sett.jpg";
                                  }
                                  else if(char_id5[i]=="Sivir"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Sivir_1668168593-Sivir.jpg";
                                  }
                                  else if(char_id5[i]=="Sona"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Sona_1668168576-Sona.jpg";
                                  }
                                  else if(char_id5[i]=="Soraka"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Soraka_1668168584-Soraka.jpg";
                                  }
                                  else if(char_id5[i]=="Sylas"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1668168543-Sylas.jpg";
                                  }
                                  else if(char_id5[i]=="Syndra"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Syndra_1668168599-Syndra.jpg";
                                  }
                                  else if(char_id5[i]=="Taliyah"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1668168820-Taliyah.jpg";
                                  }
                                  else if(char_id5[i]=="Talon"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Talon_1668168811-Talon.jpg";
                                  }
                                  else if(char_id5[i]=="Urgot"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Urgot_1668168652-Urgot.jpg";
                                  }
                                  else if(char_id5[i]=="Vayne"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Vayne_1668168465-Vayne.jpg";
                                  }
                                  else if(char_id5[i]=="Velkoz"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Velkoz_1668168479-Velkoz.jpg";
                                  }
                                  else if(char_id5[i]=="Vi"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Vi_1668168449-Vi.jpg";
                                  }
                                  else if(char_id5[i]=="Viego"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Viego_1668168492-Viego.jpg"
                                  }
                                  else if(char_id5[i]=="WuKong"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1668168644-Wukong.jpg"
                                  }
                                  else if(char_id5[i]=="Yasuo"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1668168633-Yasuo.jpg";
                                  }
                                  else if(char_id5[i]=="Yuumi"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Yuumi_1668168657-Yuumi.jpg";
                                  }
                                  else if(char_id5[i]=="Zac"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1668168679-Zac.jpg"
                                  }
                                  else if(char_id5[i]=="Zed"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Zed_1668168704-Zed.jpg"
                                  }
                                  else if(char_id5[i]=="Zoe"){
                                    char_img5[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1668168742-Zoe.jpg"
                                  }
                                }
            
            
                                for(var i=0;i<trait_id5.length;i++){
                       
                                  if(trait_id5[i]=="Admin"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/ADMIN_normal_1668171639-A.D.M.I.N..svg";
                                  }
                                  else if(trait_id5[i]=="AnimaSquad"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/AnimaSquad_normal_1668171609-Anima%20Squad.svg";
                                  }
                                  else if(trait_id5[i]=="Arsenal"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Arsenal_normal_1668170415-Arsenal.svg"
                                  }
                                  else if(trait_id5[i]=="Civilian"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Civilian_normal_1668171622-Civillan.svg"
                                  }
                                  else if(trait_id5[i]=="Gadgeteen"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Gadgeteen_normal_1668171603-Gadgeteen.svg";
                                  }
                                  else if(trait_id5[i]=="LaserCorps"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/LaserCorps_normal_1668171618-LaserCorps.svg"
                                  }
                                  else if(trait_id5[i]=="ExoPrime"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/MechaPRIME_normal_1668171595-Mecha%20_%20PRIME.svg";
                                  }
                                  else if(trait_id5[i]=="OxForce"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/OxForce_normal_1668171649-Ox%20Force.svg";
                                  }
                                  else if(trait_id5[i]=="StarGuardian"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/StarGuardian_normal_1668171627-Star%20Guardian.svg"
                                  }
                                  else if(trait_id5[i]=="Supers"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Supers_normal_1668171631-Supers.svg"
                                  }
                                  else if(trait_id5[i]=="Threat"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Threat_normal_1668171635-Threat.svg"
                                  }
                                  else if(trait_id5[i]=="Underground"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Underground_normal_1668171645-Underground.svg"
                                  }
                                  else if(trait_id5[i]=="Ace"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Ace_normal_1668171455-Ace.svg"
                                  }
                                  else if(trait_id5[i]=="Aegis"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Aegis_normal_1668171474-Aegis.svg"
                                  }
                                  else if(trait_id5[i]=="Brawler"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Brawler_normal_1668171507-Brawler.svg"
                                  }
                                  else if(trait_id5[i]=="Corrupted"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Corrupted_normal_1668171552-Corrupted.svg"
                                  }
                                  else if(trait_id5[i]=="Defender"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Defender_normal_1668171540-Defender.svg"
                                  }
                                  else if(trait_id5[i]=="Duelist"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Duelist_normal_1668171631-Duelist.svg"
                                  }
                                  else if(trait_id5[i]=="Forecaster"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Forecaster_normal_1668171558-Forecaster.svg";
                                  }
                                  else if(trait_id5[i]=="Hacker"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Hacker_normal_1668171706-Hacker.svg";
                                  }
                                  else if(trait_id5[i]=="Heart"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Heart_normal_1668171662-Heart.svg";
                                  }
                                  else if(trait_id5[i]=="Mascot"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Mascot_normal_1668171647-Mascot.svg";
                                  }
                                  else if(trait_id5[i]=="Prankster"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Prankster_normal_1668171562-Prankster.svg";
                                  }
                                  else if(trait_id5[i]=="Recon"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Recon_normal_1668171579-Recon.svg";
                                  }
                                  else if(trait_id5[i]=="Renegade"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Renegade_normal_1668171599-Renegade.svg";
                                  }
                                  else if(trait_id5[i]=="Spellslinger"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Spellslinger_normal_1668171686-Spellslinger.svg";
                                  }
                                  else if(trait_id5[i]=="Sureshot"){
                                    trait_img5[i]="https://cdn.lolchess.gg/upload/images/traits/Sureshot_normal_1668171615-Sureshot.svg";
                                  }
                                  else{
                                    trait_img5[i]= "a";
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
                     c_placement: placement,
                     c_imgtrait: trait_img,
                     c_imgchar: char_img,
                     c_imgtrait2: trait_img2,
                     c_imgchar2: char_img2,
                     c_imgtrait3: trait_img3,
                     c_imgchar3: char_img3,
                     c_imgtrait4: trait_img4,
                     c_imgchar4: char_img4,
                     c_imgtrait5: trait_img5,
                     c_imgchar5: char_img5,
                     c_id: champ_id,
                     c_name: champ_name,
                     c_point: champ_point,
                     c_pic: champ_pic,
                     c_rotation : rotation_pic,
                     c_chname: ch_name,
                     c_chwins: ch_wins,
                     c_chlosses: ch_losses,
                     c_chleaguePoint: ch_leaguePoints,
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
          });
        });
      });
        });
      });
};