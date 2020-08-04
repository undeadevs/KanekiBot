const MPScore = require('./MPScore'),
consts = require('../consts');
class Game {
    constructor(data) {
        this.id = data.game_id;
        this.rawStart = data.start_time;
        this.rawEnd = data.end_time;
        this.beatmapID = data.beatmap_id;
        this.mode = consts.beatmaps.mode[data.play_mode];
        this.type = consts.multi.teamType[data.team_type];
        this.rawMods = data.mods;
        this.scores = data.scores.map(score => new MPScore(score))
    }
    start() {
        if(this._start !== undefined || this._start !== null) return this._start;
        this._start = new Date(Date.parse(this.rawStart) - 28800000 - (new Date().getTimezoneOffset() * 60000))
        return this._start;
    }
    end() {
        if(this._end !== undefined || this._end !== null) return this._end;
        this._end = new Date(Date.parse(this.rawEnd) - 28800000 - (new Date().getTimezoneOffset() * 60000));
        return this._end;
    }
    mods() {
        if(this._mods !== undefined || this._mods !== null) return this._mods;
        this._mods = [];
        for (let mod in consts.mods) {
            if(this.raw_mods & consts.mods[mod])
            this._mods.push(mod)
        }
        return this._mods;
    }
}
module.exports = Game;