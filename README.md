
# FindMe.GG

## 프로젝트 소개

- `Riot Games Api`를 통한 TFT 정보 사이트 만들기 (FindMe.GG 마더프로젝트 개선)

## 활용 가능한 데이터 `(API_KEY Required.)`

## 기술 스택
  1. Frontend : React
  2. Backend : Node.js
  3. AWS : EC2

### `TFT-SUMMONER`

> https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/{summonerName}

- 소환사 이름 - `name`
- 소환사 레벨 - `summonerLevel`
- 소환사 정보 갱신 시각 - `revisionDate`
- 암호화된 소환사 아이디 - `summonerId`
- 암호화된 계정 아이디 - `accountId`
* `puuid` => matchId를 얻는 데 사용

### `TFT-LEAGUE`

> https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/{summonerId}

- 암호화된 소환사 아이디 - `summonerId`
- 소환사의 랭크 - `rank`
- 소환사의 이긴 판수 - `wins`
- 소환사의 진 판수 - `losses`
- 소환사의 리그포인트 - `leaguePoints`

### `TFT-MATCH`

> https://kr.api.riotgames.com/tft/match/v1/matches/{matchId}

- 전적 리스트 - `matches`
- 게임 모드 - `queue`
- 게임 아이디 - `gameId`
- 게임 모드 - `queue_id`


## 개발 히스토리 
- 2022-11-10
  - 주제 선정, 역할 분담, team repository 생성, 마더프로젝트 fork(Findme.gg)
- 2022-11-17
  - api 분석, api키 요청, README.md 생성&최초 설정, AWS 세팅


## 빌드 방법

### 1) LoL Api 키를 발급받습니다. 

  - https://developer.riotgames.com/

### 2) npm install

  - npm install

### 3) 해당 Repository를 clone 해주세요.

  - http://khuhub.khu.ac.kr/2018102248/Open_Source_Project.git

### 4) Test.js를 수정해주세요.

  - var apikey = "your api key"

## 사용 방법

  - 1) 주소... 를 입력해주세요.

  - 2) 소환사 이름에 검색하고 싶은 소환사 이름을 입력해준 후 click! 버튼을 클릭해주세요.

  - 3) 소환사 정보(티어, 승률, 전적)가 사이트에 표시됩니다.

      a. 전적기록 보기 버튼을 클릭하면 전적 기록을 볼 수 있는 창으로 넘아갑니다.

