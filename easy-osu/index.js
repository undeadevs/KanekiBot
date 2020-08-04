module.exports = {
    version: `v${require('./package.json').version}`,
    Api: require('./lib/api'),
    Consts: require('./lib/consts'),
    Beatmap: require('./lib/src/Beatmap'),
    Score: require('./lib/src/Score'),
    MPScore: require('./lib/src/MPScore'),
    Game: require('./lib/src/Game'),
    Event: require('./lib/src/Event'),
    Player: require('./lib/src/Player')
}