const consts = require('../consts');
const fn = require('../methods/formatNumber')
class Beatmap {
    constructor(data) {
        //Beatmap information
        this.id = data.beatmap_id;
        this.url = `https://osu.ppy.sh/b/${data.beatmap_id}`
        this.title = data.title;
        this.mappingBy = data.creator;
        this.source = data.source;
        this.artist = data.artist;
        this.genre = consts.beatmaps.genre[data.genre_id];
        this.lang = consts.beatmaps.lang[data.language_id];
        this.status = consts.beatmaps.status[data.approved];
        this.tags = data.tags.split(' ')
        this.beatmapSetID = data.beatmapset_id;
        this.version = data.version;
        
        //Stats
        this.bpm = fn(data.bpm);
        this.maxCombo = fn(data.max_combo);
        this.difficulty = {
            'rating': data.difficultyrating,
            'circle-size': data.diff_size,
            'overall': data.diff_overall,
            'approach-rate': data.diff_approach,
            'hp-drain': data.diff_drain
        }
        this.time = {
            'total-time': data.total_length,
            'drain': data.hit_length
        }
        this.counts = {
            'favorites': (data.favorite_count) || 0,
            'favourites': fn(data.favourite_count) || 0,
            'plays': fn(data.playcount) || 0,
            'passes': fn(data.passcount) || 0
        }
    }
    approvedDate() {
        if(this._approvedDate !== undefined || this._approvedDate !== null) return this._approvedDate;
        this._approvedDate = this.raw_approvedDate ? new Date(Date.parse(this.raw_approvedDate) - 28800000 - (new Date().getTimezoneOffset() * 60000)) : null;
        return this._approvedDate;
    }
    lastBeatmapUpdate() {
        if(this._lastUpdate !== undefined || this._lastUpdate !== null) return this._lastUpdate;
        this._lastUpdate = new Date(Date.parse(this.raw_lastUpdate) - 28800000 - (new Date().getTimezoneOffset() * 60000));
        return this._lastUpdate;
    }
}
module.exports = Beatmap