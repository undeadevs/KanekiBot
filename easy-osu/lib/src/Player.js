const Event = require('./Event');
const fn = require('../methods/formatNumber')
class User {
    constructor(data) {
        this.id = data.user_id;
        this.profileURL = `https://osu.ppy.sh/users/${data.user_id}/`
        this.userAvatar = `https://a.ppy.sh/${data.user_id}`
        this.name = data.username;
        this.counts = {
            '300': fn(data.count300),
			'100': fn(data.count100),
			'50': fn(data.count50),
			'SS+': fn(data.count_rank_ssh),
			'SS': fn(data.count_rank_ss),
			'S+': fn(data.count_rank_sh),
			'S': fn(data.count_rank_s),
			'A': fn(data.count_rank_a),
			'plays': fn(data.playcount)
        }
        this.scores = {
            ranked: fn(data.ranked_score),
            total: fn(data.total_score)
        }
        this.pp = {
            pp: (Math.round(data.pp_raw * 100) / 100) || 0,
            rank: data.pp_rank,
            countryrank: data.pp_country_rank
        }
        this.country = data.country;
        this.level = Math.round(data.level * 100) / 100;
        this.accuracy = (Math.round(data.accuracy * 100) / 100) + '%';
        this.events = data.events.map(event => new Event(event))
    }
    accuracyFormat() {
        return parseFloat(this.accuracy).toFixed(2) + '%'
    }
}
module.exports = User;