const e = require("express");

module.exports = function(app){

    var request = require("request");
    var urlenconde = require('urlencode');
    var apikey = "RGAPI-a1d7a3c7-1e0a-4c22-83ac-e7b5f122ac83"//api 변경필요
    
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
            var champions_length = Object.keys(info_champ_json).length;
    
        //console.log("\n\ninfo_champ_json\n\n", info_champ_json);
    
            // status code가 200이 아니면 종료.
           
    
            var rotationUrl = "https://kr.api.riotgames.com/lol/platform/v4/champion-rotations?api_key="+apikey;
            request(rotationUrl,function(error,response,body){
              var info_rotation = JSON.parse(body);
              var keys = Object.keys(info_rotation);

            var staticUrl = "http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json";
            request(staticUrl,function(error,response,body){
              
              var challengerplayer = "https://kr.api.riotgames.com/tft/league/v1/challenger?api_key=" + apikey;
              request(challengerplayer,function(error,response,body){
                var info_challenger_player =JSON.parse(body);
                for(var i = 0;i<10;i++){
                  ch_name[i] = info_challenger_player["entries"][i]["summonerName"];
                  ch_wins[i] = info_challenger_player["entries"][i]["wins"];
                  ch_losses[i] = info_challenger_player["entries"][i]["losses"];
                  ch_leaguePoints[i] = info_challenger_player["entries"][i]["leaguePoints"];

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
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/gold.png?image=q_auto,f_webp,w_144&v=1669867000997https://i.imgur.com/Ec4hPuO.png"
                    }else if(tier == "SILVER"){
                    img_tier = "https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1669867001194"
                    }else if(tier == "BRONZE"){
                    img_tier ="https://opgg-static.akamaized.net/images/medals_new/bronze.png?image=q_auto,f_webp,w_144&v=1669867000997"
                    }
                    else if(tier=="IRON"){
                      img_tier="https://opgg-static.akamaized.net/images/medals_new/iron.png?image=q_auto,f_webp,w_144&v=1669867001194"
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
                      else if(char_id[i]=="AoShin"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/AoShin_1653029477.png";
                      }
                      else if(char_id[i]=="Aphelios"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1661160970-Aphelios.jpg";
                      }
                      else if(char_id[i]=="AurelionSol"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1653030178.png";
                      }
                      else if(char_id[i]=="Bard"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Bard_1653029776.png";
                      }
                      else if(char_id[i]=="Braum"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Braum_1653029795.png";
                      }
                      else if(char_id[i]=="Diana"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Diana_1653029713.png";
                      }
                      else if(char_id[i]=="Gnar"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Gnar_1653029639.png";
                      }
                      else if(char_id[i]=="Graves"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Graves_1661160979-Graves.jpg";
                      }
                      else if(char_id[i]=="Ezreal"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1653030256.png";
                      }
                      else if(char_id[i]=="Twitch"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                      }
                      else if(char_id[i]=="DragonGold"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Idas_1653029461.png";
                      }
                      else if(char_id[i]=="Jax"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1661160884-Jax.jpg";
                      }
                      else if(char_id[i]=="Kaisa"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1661160931-Kai%E2%80%99sa.jpg";
                      }
                      else if(char_id[i]=="Karma"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Karma_1653030340.png";
                      }
                      else if(char_id[i]=="LeeSin"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1653029760.png";
                      }
                      else if(char_id[i]=="Leona"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1653029737.png";
                      }
                      else if(char_id[i]=="Lillia"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Lillia_1653029767.png";
                      }
                      else if(char_id[i]=="Lux"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1661161022-Lux.jpg";
                      }
                      else if(char_id[i]=="Malphite"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1661161013-Malphite.jpg";
                      }
                      else if(char_id[i]=="Nasus"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1661161028-Nasus.jpg";
                      }
                      else if(char_id[i]=="Nidalee"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nidalee_1653029698.png";
                      }
                      else if(char_id[i]=="Nilah"){
                        char_img[i]="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Nilah.png";
                      }
                      else if(char_id[i]=="Nunu"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1653029687.png";
                      }
                      else if(char_id[i]=="Olaf"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Olaf_1653030240.png";
                      }
                      else if(char_id[i]=="Pantheon"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Pantheon_1661160893-Pantheon.jpg";
                      }
                      else if(char_id[i]=="Qiyana"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Qiyana_1653030385.png";
                      }
                      else if(char_id[i]=="Rakan"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Rakan_1661161005-Rakan.jpg";
                      }
                      else if(char_id[i]=="Rell"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1661160999-Rell.jpg";
                      }
                      else if(char_id[i]=="Rengar"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Rengar_1661161045-Rengar.jpg";
                      }
                      else if(char_id[i]=="Senna"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1653029893.png";
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
                      else if(char_id[i]=="Sylas"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1653029846.png";
                      }
                      else if(char_id[i]=="Taliyah"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1661160902-Taliyah.jpg";
                      }
                      else if(char_id[i]=="Twitch"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                      }
                      else if(char_id[i]=="Vladimir"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Vladimir_1653029808.png";
                      }
                      else if(char_id[i]=="Seraphine"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Seraphine_1661160986-Seraphine.jpg";
                      }
                      else if(char_id[i]=="Sett"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1653030015.png";
                      }
                      else if(char_id[i]=="Shyvana"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Shyvana_1653030108.png";
                      }
                      else if(char_id[i]=="Skarner"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Skarner_1653030158.png";
                      }
                      else if(char_id[i]=="_Volibear"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Volibear_1653029788.png";
                      }
                      else if(char_id[i]=="Wukong"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1661160962-Wukong.jpg";
                      }
                      else if(char_id[i]=="Xayah"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Xayah_1653030304.png";
                      }
                      else if(char_id[i]=="Yasuo"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1653030213.png";
                      }
                      else if(char_id[i]=="Yone"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Yone_1653030248.png";
                      }
                      else if(char_id[i]=="Zac"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1661160939-Zac.jpg";
                      }
                      else if(char_id[i]=="Zeri"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zeri_1661160923-Zeri.jpg";
                      }
                      else if(char_id[i]=="Zoe"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1653030312.png";
                      }
                      else if(char_id[i]=="Zyra"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Zyra_1661160955-Zyra.jpg";
                      }
                      else if(char_id[i]=="DragonPurple"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/Syfen_1653029452.png"
                      }
                      else if(char_id[i]=="DragonGreen"){
                        char_img[i]="https://cdn.lolchess.gg/upload/images/champions/ShiOhYu_1653187776.png"
                      }
                    }


                    for(var i=0;i<trait_id.length;i++){
                    
                      if(trait_id[i]=="Astral"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Astral_normal_1658472777-astral.svg";
                      }
                      else if(trait_id[i]=="Darkflight"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Darkflight_normal_1660866323-Darkflight.svg";
                      }
                      else if(trait_id[i]=="Guild"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Guild_normal_1658472708-guild.svg"
                      }
                      else if(trait_id[i]=="Jade"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Jade_normal_1658472802-jade.svg"
                      }
                      else if(trait_id[i]=="Lagoon"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Lagoon_normal_1660866433-Lagoon.svg";
                      }
                      else if(trait_id[i]=="Mirage"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Mirage_normal_1658472829-mirage.svg"
                      }
                      else if(trait_id[i]=="Monolith"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Monolith_normal_1660866564-Monolith.svg";
                      }
                      else if(trait_id[i]=="Prodigy"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Prodigy_normal_1660866635-Prodigy.svg";
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
                      else if(trait_id[i]=="Whispers"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Whispers_normal_1658472820-whispers.svg";
                      }
                      else if(trait_id[i]=="Bard"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Bard_normal_1660832866-bard.svg";
                      }
                      else if(trait_id[i]=="Bruiser"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Bruiser_normal_1658472871-bruiser.svg";
                      }
                      else if(trait_id[i]=="Cannoneer"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Cannoneer_normal_1660833003-cannoneer%20(1).svg";
                      }
                      else if(trait_id[i]=="Dragonmancer"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Dragonmancer_normal_1660832841-dragonmancer.svg";
                      }
                      else if(trait_id[i]=="Evoker"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Evoker_normal_1660832889-evoker.svg";
                      }
                      else if(trait_id[i]=="Guardian"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Guardian_normal_1660832691-guardian.svg";
                      }
                      else if(trait_id[i]=="Mage"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Mage_normal_1660832787-mage.svg";
                      }
                      else if(trait_id[i]=="Mystic"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Mystic_normal_1660832723-mystic.svg";
                      }
                      else if(trait_id[i]=="SpellThief"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/SpellThief_normal_1660832955-spellthief.svg";
                      }
                      else if(trait_id[i]=="Starcaller"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Starcaller_normal_1658472888-starcaller.svg";
                      }
                      else if(trait_id[i]=="Warrior"){
                        trait_img[i]="https://cdn.lolchess.gg/upload/images/traits/Warrior_normal_1660832913-warrior.svg";
                      }
                    }

                    var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[1]) + "?api_key=" +apikey;
                  
                request(userGameUrl,function(error,response,body){
                    var info_game = JSON.parse(body);
  
                    for(var j=0;j<8;j++){
                      if(info_game["info"]["participants"][j]["puuid"]==puuid){
                        for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                          trait_id2[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                        }
                        for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                          char_id2[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                        }
                            
                      }
                    }
                    for(var i=0;i<char_id2.length;i++){

                      if(char_id2[i]=="Sejuani"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1653029956.png";
                      }
                      else if(char_id2[i]=="AoShin"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/AoShin_1653029477.png";
                      }
                      else if(char_id2[i]=="Aphelios"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1661160970-Aphelios.jpg";
                      }
                      else if(char_id2[i]=="AurelionSol"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1653030178.png";
                      }
                      else if(char_id2[i]=="Bard"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Bard_1653029776.png";
                      }
                      else if(char_id2[i]=="Braum"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Braum_1653029795.png";
                      }
                      else if(char_id2[i]=="Diana"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Diana_1653029713.png";
                      }
                      else if(char_id2[i]=="Gnar"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Gnar_1653029639.png";
                      }
                      else if(char_id2[i]=="Graves"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Graves_1661160979-Graves.jpg";
                      }
                      else if(char_id2[i]=="Ezreal"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1653030256.png";
                      }
                      else if(char_id2[i]=="Twitch"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                      }
                      else if(char_id2[i]=="DragonGold"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Idas_1653029461.png";
                      }
                      else if(char_id2[i]=="Jax"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1661160884-Jax.jpg";
                      }
                      else if(char_id2[i]=="Kaisa"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1661160931-Kai%E2%80%99sa.jpg";
                      }
                      else if(char_id2[i]=="Karma"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Karma_1653030340.png";
                      }
                      else if(char_id2[i]=="LeeSin"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1653029760.png";
                      }
                      else if(char_id2[i]=="Leona"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1653029737.png";
                      }
                      else if(char_id2[i]=="Lillia"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Lillia_1653029767.png";
                      }
                      else if(char_id2[i]=="Lux"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1661161022-Lux.jpg";
                      }
                      else if(char_id2[i]=="Malphite"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1661161013-Malphite.jpg";
                      }
                      else if(char_id2[i]=="Nasus"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1661161028-Nasus.jpg";
                      }
                      else if(char_id2[i]=="Nidalee"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nidalee_1653029698.png";
                      }
                      else if(char_id2[i]=="Nilah"){
                        char_img2[i]="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Nilah.png";
                      }
                      else if(char_id2[i]=="Nunu"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1653029687.png";
                      }
                      else if(char_id2[i]=="Olaf"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Olaf_1653030240.png";
                      }
                      else if(char_id2[i]=="Pantheon"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Pantheon_1661160893-Pantheon.jpg";
                      }
                      else if(char_id2[i]=="Qiyana"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Qiyana_1653030385.png";
                      }
                      else if(char_id2[i]=="Rakan"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Rakan_1661161005-Rakan.jpg";
                      }
                      else if(char_id2[i]=="Rell"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1661160999-Rell.jpg";
                      }
                      else if(char_id2[i]=="Rengar"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Rengar_1661161045-Rengar.jpg";
                      }
                      else if(char_id2[i]=="Senna"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1653029893.png";
                      }
                      else if(char_id2[i]=="Varus"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Varus_1653029781.png";
                      }
                      else if(char_id2[i]=="DragonGuild"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zippy_1664508034-Zippy_1661407350-tft7_zippy_square.tft_set7_stage2.png";
                      }
                      else if(char_id2[i]=="Hecarim"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Hecarim_1653030476.png";
                      }
                      else if(char_id2[i]=="Jayce"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Jayce_1661160949-Jayce.jpg";
                      }
                      else if(char_id2[i]=="Sylas"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1653029846.png";
                      }
                      else if(char_id2[i]=="Taliyah"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1661160902-Taliyah.jpg";
                      }
                      else if(char_id2[i]=="Twitch"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                      }
                      else if(char_id2[i]=="Vladimir"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Vladimir_1653029808.png";
                      }
                      else if(char_id2[i]=="Seraphine"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Seraphine_1661160986-Seraphine.jpg";
                      }
                      else if(char_id2[i]=="Sett"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1653030015.png";
                      }
                      else if(char_id2[i]=="Shyvana"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Shyvana_1653030108.png";
                      }
                      else if(char_id2[i]=="Skarner"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Skarner_1653030158.png";
                      }
                      else if(char_id2[i]=="_Volibear"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Volibear_1653029788.png";
                      }
                      else if(char_id2[i]=="Wukong"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1661160962-Wukong.jpg";
                      }
                      else if(char_id2[i]=="Xayah"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Xayah_1653030304.png";
                      }
                      else if(char_id2[i]=="Yasuo"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1653030213.png";
                      }
                      else if(char_id2[i]=="Yone"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Yone_1653030248.png";
                      }
                      else if(char_id2[i]=="Zac"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1661160939-Zac.jpg";
                      }
                      else if(char_id2[i]=="Zeri"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zeri_1661160923-Zeri.jpg";
                      }
                      else if(char_id2[i]=="Zoe"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1653030312.png";
                      }
                      else if(char_id2[i]=="Zyra"){
                        char_img2[i]="https://cdn.lolchess.gg/upload/images/champions/Zyra_1661160955-Zyra.jpg";
                      }
                    }


                    for(var i=0;i<trait_id2.length;i++){
                    
                      if(trait_id2[i]=="Astral"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Astral_normal_1658472777-astral.svg";
                      }
                      else if(trait_id2[i]=="Darkflight"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Darkflight_normal_1660866323-Darkflight.svg";
                      }
                      else if(trait_id2[i]=="Guild"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Guild_normal_1658472708-guild.svg"
                      }
                      else if(trait_id2[i]=="Jade"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Jade_normal_1658472802-jade.svg"
                      }
                      else if(trait_id2[i]=="Lagoon"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Lagoon_normal_1660866433-Lagoon.svg";
                      }
                      else if(trait_id2[i]=="Mirage"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Mirage_normal_1658472829-mirage.svg"
                      }
                      else if(trait_id2[i]=="Monolith"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Monolith_normal_1660866564-Monolith.svg";
                      }
                      else if(trait_id2[i]=="Prodigy"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Prodigy_normal_1660866635-Prodigy.svg";
                      }
                      else if(trait_id2[i]=="Ragewing"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Ragewing_normal_1658472786-ragewing.svg"
                      }
                      else if(trait_id2[i]=="Revel"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Revel_normal_1658472846-revel.svg"
                      }
                      else if(trait_id2[i]=="Scalescorn"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Scalescorn_normal_1658472793-scalescorn.svg"
                      }
                      else if(trait_id2[i]=="Shimmerscale"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Shimmerscale_normal_1658472811-shimmerscale.svg"
                      }
                      else if(trait_id2[i]=="Assasin"){
                        trait_img2[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/assassin.svg"
                      }
                      else if(trait_id2[i]=="Cavalier"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Cavalier_normal_1658472863-cavalier.svg"
                      }
                      else if(trait_id2[i]=="Dragon"){
                        trait_img2[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/dragons.svg"
                      }
                      else if(trait_id2[i]=="Shapeshifter"){
                        trait_img2[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/shapeshifter.svg"
                      }
                      else if(trait_id2[i]=="Swiftshot"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Swiftshot_normal_1658472880-swiftshot.svg"
                      }
                      else if(trait_id2[i]=="Tempest"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Tempest_normal_1658472854-tempest.svg"
                      }
                      else if(trait_id2[i]=="Whispers"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Whispers_normal_1658472820-whispers.svg";
                      }
                      else if(trait_id2[i]=="Bard"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Bard_normal_1660832866-bard.svg";
                      }
                      else if(trait_id2[i]=="Bruiser"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Bruiser_normal_1658472871-bruiser.svg";
                      }
                      else if(trait_id2[i]=="Cannoneer"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Cannoneer_normal_1660833003-cannoneer%20(1).svg";
                      }
                      else if(trait_id2[i]=="Dragonmancer"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Dragonmancer_normal_1660832841-dragonmancer.svg";
                      }
                      else if(trait_id2[i]=="Evoker"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Evoker_normal_1660832889-evoker.svg";
                      }
                      else if(trait_id2[i]=="Guardian"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Guardian_normal_1660832691-guardian.svg";
                      }
                      else if(trait_id2[i]=="Mage"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Mage_normal_1660832787-mage.svg";
                      }
                      else if(trait_id2[i]=="Mystic"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Mystic_normal_1660832723-mystic.svg";
                      }
                      else if(trait_id2[i]=="SpellThief"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/SpellThief_normal_1660832955-spellthief.svg";
                      }
                      else if(trait_id2[i]=="Starcaller"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Starcaller_normal_1658472888-starcaller.svg";
                      }
                      else if(trait_id2[i]=="Warrior"){
                        trait_img2[i]="https://cdn.lolchess.gg/upload/images/traits/Warrior_normal_1660832913-warrior.svg";
                      }
                    }

                    var userGameUrl = "https://asia.api.riotgames.com/tft/match/v1/matches/" + urlenconde(info_match[2]) + "?api_key=" +apikey;
                  
                    request(userGameUrl,function(error,response,body){
                        var info_game = JSON.parse(body);
      
                        for(var j=0;j<8;j++){
                          if(info_game["info"]["participants"][j]["puuid"]==puuid){
                            for(var k=0;k<info_game["info"]["participants"][j]["traits"].length;k++){
                              trait_id3[k]=info_game["info"]["participants"][j]["traits"][k]["name"].substr(5,);
                            }
                            for(var k=0;k<info_game["info"]["participants"][j]["units"].length;k++){
                              char_id3[k]=info_game["info"]["participants"][j]["units"][k]["character_id"].substr(5,);
                            }
                                
                          }
                        }
                        

                        for(var i=0;i<char_id3.length;i++){
                          
                          if(char_id3[i]=="Sejuani"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sejuani_1653029956.png";
                          }
                          else if(char_id3[i]=="DragonPurple"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Syfen_1653029452.png";
                          }
                          else if(char_id3[i]=="AoShin"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/AoShin_1653029477.png";
                          }
                          else if(char_id3[i]=="Aphelios"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Aphelios_1661160970-Aphelios.jpg";
                          }
                          else if(char_id3[i]=="AurelionSol"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/AurelionSol_1653030178.png";
                          }
                          else if(char_id3[i]=="Bard"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Bard_1653029776.png";
                          }
                          else if(char_id3[i]=="Braum"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Braum_1653029795.png";
                          }
                          else if(char_id3[i]=="Diana"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Diana_1653029713.png";
                          }
                          else if(char_id3[i]=="Gnar"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Gnar_1653029639.png";
                          }
                          else if(char_id3[i]=="Graves"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Graves_1661160979-Graves.jpg";
                          }
                          else if(char_id3[i]=="Ezreal"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Ezreal_1653030256.png";
                          }
                          else if(char_id3[i]=="Twitch"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                          }
                          else if(char_id3[i]=="DragonGold"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Idas_1653029461.png";
                          }
                          else if(char_id3[i]=="Jax"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Jax_1661160884-Jax.jpg";
                          }
                          else if(char_id3[i]=="Kaisa"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Kaisa_1661160931-Kai%E2%80%99sa.jpg";
                          }
                          else if(char_id3[i]=="Karma"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Karma_1653030340.png";
                          }
                          else if(char_id3[i]=="LeeSin"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/LeeSin_1653029760.png";
                          }
                          else if(char_id3[i]=="Leona"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Leona_1653029737.png";
                          }
                          else if(char_id3[i]=="Lillia"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Lillia_1653029767.png";
                          }
                          else if(char_id3[i]=="Lux"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Lux_1661161022-Lux.jpg";
                          }
                          else if(char_id3[i]=="Malphite"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Malphite_1661161013-Malphite.jpg";
                          }
                          else if(char_id3[i]=="Nasus"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nasus_1661161028-Nasus.jpg";
                          }
                          else if(char_id3[i]=="Nidalee"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nidalee_1653029698.png";
                          }
                          else if(char_id3[i]=="Nilah"){
                            char_img3[i]="https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Nilah.png";
                          }
                          else if(char_id3[i]=="Nunu"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Nunu_1653029687.png";
                          }
                          else if(char_id3[i]=="Olaf"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Olaf_1653030240.png";
                          }
                          else if(char_id3[i]=="Pantheon"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Pantheon_1661160893-Pantheon.jpg";
                          }
                          else if(char_id3[i]=="Qiyana"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Qiyana_1653030385.png";
                          }
                          else if(char_id3[i]=="Rakan"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Rakan_1661161005-Rakan.jpg";
                          }
                          else if(char_id3[i]=="Rell"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Rell_1661160999-Rell.jpg";
                          }
                          else if(char_id3[i]=="Rengar"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Rengar_1661161045-Rengar.jpg";
                          }
                          else if(char_id3[i]=="Senna"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Senna_1653029893.png";
                          }
                          else if(char_id3[i]=="Varus"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Varus_1653029781.png";
                          }
                          else if(char_id3[i]=="DragonGuild"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zippy_1664508034-Zippy_1661407350-tft7_zippy_square.tft_set7_stage2.png";
                          }
                          else if(char_id3[i]=="Hecarim"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Hecarim_1653030476.png";
                          }
                          else if(char_id3[i]=="Jayce"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Jayce_1661160949-Jayce.jpg";
                          }
                          else if(char_id3[i]=="Sylas"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sylas_1653029846.png";
                          }
                          else if(char_id3[i]=="Taliyah"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Taliyah_1661160902-Taliyah.jpg";
                          }
                          else if(char_id3[i]=="Twitch"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Twitch_1653030423.png";
                          }
                          else if(char_id3[i]=="Vladimir"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Vladimir_1653029808.png";
                          }
                          else if(char_id3[i]=="Seraphine"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Seraphine_1661160986-Seraphine.jpg";
                          }
                          else if(char_id3[i]=="Sett"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Sett_1653030015.png";
                          }
                          else if(char_id3[i]=="Shyvana"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Shyvana_1653030108.png";
                          }
                          else if(char_id3[i]=="Skarner"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Skarner_1653030158.png";
                          }
                          else if(char_id3[i]=="_Volibear"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Volibear_1653029788.png";
                          }
                          else if(char_id3[i]=="Wukong"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/MonkeyKing_1661160962-Wukong.jpg";
                          }
                          else if(char_id3[i]=="Xayah"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Xayah_1653030304.png";
                          }
                          else if(char_id3[i]=="Yasuo"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Yasuo_1653030213.png";
                          }
                          else if(char_id3[i]=="Yone"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Yone_1653030248.png";
                          }
                          else if(char_id3[i]=="Zac"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zac_1661160939-Zac.jpg";
                          }
                          else if(char_id3[i]=="Zeri"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zeri_1661160923-Zeri.jpg";
                          }
                          else if(char_id3[i]=="Zoe"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zoe_1653030312.png";
                          }
                          else if(char_id3[i]=="Zyra"){
                            char_img3[i]="https://cdn.lolchess.gg/upload/images/champions/Zyra_1661160955-Zyra.jpg";
                          }
                        }
    
    
                        for(var i=0;i<trait_id3.length;i++){
                        
                          if(trait_id3[i]=="Astral"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Astral_normal_1658472777-astral.svg";
                          }
                          else if(trait_id3[i]=="Darkflight"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Darkflight_normal_1660866323-Darkflight.svg";
                          }
                          else if(trait_id3[i]=="Guild"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Guild_normal_1658472708-guild.svg"
                          }
                          else if(trait_id3[i]=="Jade"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Jade_normal_1658472802-jade.svg"
                          }
                          else if(trait_id3[i]=="Lagoon"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Lagoon_normal_1660866433-Lagoon.svg";
                          }
                          else if(trait_id3[i]=="Mirage"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Mirage_normal_1658472829-mirage.svg"
                          }
                          else if(trait_id3[i]=="Monolith"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Monolith_normal_1660866564-Monolith.svg";
                          }
                          else if(trait_id3[i]=="Prodigy"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Prodigy_normal_1660866635-Prodigy.svg";
                          }
                          else if(trait_id3[i]=="Ragewing"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Ragewing_normal_1658472786-ragewing.svg"
                          }
                          else if(trait_id3[i]=="Revel"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Revel_normal_1658472846-revel.svg"
                          }
                          else if(trait_id3[i]=="Scalescorn"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Scalescorn_normal_1658472793-scalescorn.svg"
                          }
                          else if(trait_id3[i]=="Shimmerscale"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Shimmerscale_normal_1658472811-shimmerscale.svg"
                          }
                          else if(trait_id3[i]=="Assasin"){
                            trait_img3[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/assassin.svg"
                          }
                          else if(trait_id3[i]=="Cavalier"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Cavalier_normal_1658472863-cavalier.svg"
                          }
                          else if(trait_id3[i]=="Dragon"){
                            trait_img3[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/dragons.svg"
                          }
                          else if(trait_id3[i]=="Shapeshifter"){
                            trait_img3[i]="https://cdn.lolchess.gg/images/tft/traiticons-darken/7.0/shapeshifter.svg"
                          }
                          else if(trait_id3[i]=="Swiftshot"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Swiftshot_normal_1658472880-swiftshot.svg"
                          }
                          else if(trait_id3[i]=="Tempest"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Tempest_normal_1658472854-tempest.svg"
                          }
                          else if(trait_id3[i]=="Whispers"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Whispers_normal_1658472820-whispers.svg";
                          }
                          else if(trait_id3[i]=="Bard"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Bard_normal_1660832866-bard.svg";
                          }
                          else if(trait_id3[i]=="Bruiser"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Bruiser_normal_1658472871-bruiser.svg";
                          }
                          else if(trait_id3[i]=="Cannoneer"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Cannoneer_normal_1660833003-cannoneer%20(1).svg";
                          }
                          else if(trait_id3[i]=="Dragonmancer"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Dragonmancer_normal_1660832841-dragonmancer.svg";
                          }
                          else if(trait_id3[i]=="Evoker"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Evoker_normal_1660832889-evoker.svg";
                          }
                          else if(trait_id3[i]=="Guardian"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Guardian_normal_1660832691-guardian.svg";
                          }
                          else if(trait_id3[i]=="Mage"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Mage_normal_1660832787-mage.svg";
                          }
                          else if(trait_id3[i]=="Mystic"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Mystic_normal_1660832723-mystic.svg";
                          }
                          else if(trait_id3[i]=="SpellThief"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/SpellThief_normal_1660832955-spellthief.svg";
                          }
                          else if(trait_id3[i]=="Starcaller"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Starcaller_normal_1658472888-starcaller.svg";
                          }
                          else if(trait_id3[i]=="Warrior"){
                            trait_img3[i]="https://cdn.lolchess.gg/upload/images/traits/Warrior_normal_1660832913-warrior.svg";
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
                     c_imgtrait2: trait_img2,
                     c_imgchar2: char_img2,
                     c_imgtrait3: trait_img3,
                     c_imgchar3: char_img3,
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
      app.get('/lol/search/:username/', function(req, res){
        //롤 api url
        name = req.params.username;
        var nameUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + urlenconde(name)+"?api_key="+ apikey;
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
              res.render('index', { title: req.params.username ,
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