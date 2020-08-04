const {mods, accuracyCalculation} = require('../consts')
class Score {
    constructor(data) {
        this.score = data.score || null;
        this.user = {
            id: data.user_id
        }
        this.beatmapID = data.beatmap_id ? data.beatmap_id : null;
        this.counts = {
            '300': data.count300 || 0,
            '100': data.count100 || 0,
            '50': data.count50 || 0,
            'geki': data.countgeki || 0,
            'katu': data.countkatu || 0,
            'miss': data.countmiss || 0
        }
        this.rank = data.rank;
        this.maxCombo = data.maxcombo || 0;
        this.perfect = data.perfect === '1' ? 'Yeap' : 'No';
        this.rawdate = data.date ? data.date : null;
        this.pp = data.pp ? data.pp : null;
        this.rawmods = data.enabled_mods ? data.enabled_mods : null;
    }
    date() {
        if(this._date !== undefined || this._date !== null) return this._date;
        this._date = new Date(Date.parse(this.raw_date) - 28800000 - (new Date().getTimezoneOffset() * 60000))
        return this._date
    }
    mods() {
		if (this._mods !== undefined)return this._mods;
		this._mods = [];
		for (let mod in mods) {
			if (this.raw_mods & mods[mod])
				this._mods.push(mod);
		}
		return this._mods;
    }
    getAccuracyFromBeatmap(beatmap) {
		return accuracyCalculation[beatmap.mode](this.counts);
	}
}
module.exports = Score;