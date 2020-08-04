const team = require('../consts').multi.team;
const fn = require('../methods/formatNumber')
class MPScore {
    constructor(data) {
        this.slot = data.slot;
        this.team = team[data.team];
        this.userID = data.user_id;
        this.score = fn(data.score);
        this.maxCombo = fn(data.maxcombo);
        this.counts = {
            '300': fn(data.count300),
            '100': fn(data.count100),
            '50': fn(data.count50),
            'geki': fn(data.countgeki),
            'katu': fn(data.countkatu),
            'miss': fn(data.countmiss)
        };
        this.perfect = data.perfect === '1' ? 'Yeap' : 'No';
        this.pass = data.pass === '1' ? 'Yeap' : 'No'
    }
}
module.exports = MPScore;