# easy-osu
Easy osu!Api wraper for Discord Bots!

## What you need
Optional: 
Hands, Keyboard, Mouse

Required: 
Get osu!Api Key from https://osu.ppy.sh/p/api

## License
This project is licensed by MIT License - see [LICENSE.md](https://github.com/oni-project/easy-osu/blob/master/LICENSE) file for details

## Docs
Require easy-osu
```js
const Osu = require('easy-osu')
```
### osu.Api

Each method return a Promise.

`options` refers to the url parameters listed here: https://github.com/ppy/osu-api/wiki

#### Constructor
```js
const osu = new Osu.Api('YOUR_API_KEY', {
    resAsError: true // Reject on not found instead of returning nothing. (default: true)
})
```

#### callToApi(endpoint, options)
Make an api call. Should generally not be used...
```js
osu.callToApi('/get_user', {u: 'StavZ'}).then(osuUser => {
    console.log(osuUser[0].name) //StavZ
    console.log(osuUser[0].userAvatar) //https://a.ppy.sh/11520265
})
```

#### getBeatmap(options)
Return first best osu.Beatmap object.
```js
osu.getBeatmap({b: '979230'}).then(beatmap => {
    console.log(beatmap.title) //(can you) understand me?
})
```

#### getUser(options)
Return osu.User object.
```js
osu.getUser({u: 'StavZ'}).then(user => {
    console.log(user.name) //StavZ
})
```

#### getUserBS(options) `User Best Scores`
Return array of osu.Score.
```js
osu.getUserBS({u: 'StavZ'}).then(bs => {
    console.log(bs[0].score) //37622080
    console.log(bs[0].pp) //76.154
})
```

#### getUserRecent(options)
Return Returns an array of osu.Score.
```js
osu.getUserRecent({u: 'StavZ'}).then(rs => {
    console.log(rs[0].score) //1245882
})
```

### osu.User
```js
User {
  id: '11520265',
  profileURL: 'https://osu.ppy.sh/users/11520265/',
  userAvatar: 'https://a.ppy.sh/11520265',
  name: 'StavZ',
  counts:
   { '50': '5,299',
     '100': '51,121',
     '300': '522,005',
     'SS+': '0',
     SS: '31',
     'S+': '0',
     S: '234',
     A: '114',
     plays: '2,611' },
  scores: { ranked: '1,271,882,502', total: '3,628,950,808' },
  pp: { pp: 1137.54, rank: '267512', countryrank: '28650' },
  country: 'RU',
  level: 81.9,
  accuracy: '96.9%',
  events: [] }
```

### osu.Event
```js
Event {
	html: '<img src=\'/images/A_small.png\'/> <b><a href=\'/u/7541046\'>StavZ</a></b> achieved rank #105 on <a href=\'/b/974072?m=0\'>Yousei Teikoku - Torikago [Insane]</a> (osu!)',
	beatmapId: '974072',
	beatmapsetId: '412140',
	date: 2016-08-28T08:21:11.000Z, // converted to UTC
	epicFactor: '1'
}
```

### osu.Beatmap
```js
Beatmap {
  id: '1036655',
  url: 'https://osu.ppy.sh/b/1036655'
  title: 'Fright March',
  mappingBy: 'Gero',
  source: 'osu!',
  artist: 'cYsmix',
  genre: 'Video Game',
  lang: 'Instrumental',
  status: 'Ranked',
  version: 'Hard'
  tags:
   [ 'oct.',
     '2015',
     'beatmapping',
     'challenge',
     'contest',
     'mapping',
     'with',
     'rewards',
     'mwr',
     '#2',
     'halloween',
     'electro',
     'trance',
     'classical' ],
  beatmapSetID: '486142',
  bpm: '160',
  maxCombo: '826',
  difficulty:
   { rating: '3.376328229904175',
     'circle-size': '4',
     overall: '6',
     'approach-rate': '8',
     'hp-drain': '6' },
  time: { 'total-time': '148', drain: '142' },
  counts:
   { favorites: 0,
     favourites: '3,132',
     plays: '1,337,479',
     passes: '167,235' } }
```

### osu.Score
```js
[ Score {
	score: '10223067',
	user: {
		name: 'StavZ'
	},
	beatmapId: null, // Will be null when osu.Api.getScores() is used
	counts: {
		'50': '0',
		'100': '13',
		'300': '406',
		geki: '87',
		katu: '10',
		miss: '0'
	},
	maxCombo: '825',
	perfect: 'No',
	date: 2016-08-13T03:17:57.000Z, // converted to UTC
	rank: 'SH',
	pp: '148.653',
	mods: [ 'Hidden', 'HardRock', 'DoubleTime', 'FreeModAllowed' ]
}]
```

### osu.MPScore
```js
MultiplayerScore {
	slot: '0',
	team: 'None',
	userId: '11520265',
	score: '238550',
	maxCombo: '113',
	counts: {
		'50': '2',
		'100': '27',
		'300': '102',
		geki: '21',
		katu: '14',
		miss: '8'
	},
	perfect: 'No',
	pass: 'No'
}
```
