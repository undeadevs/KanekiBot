const agent = require('superagent')
const UAgent = `easy-osu v${require('../package.json').version} (https://github.com/oni-project)`,
Beatmap = require('./src/Beatmap'),
Score = require('./src/Score'),
Player = require('./src/Player')

class Api {
    constructor(apiKey, options = {url: String, resAsError: Boolean}) {
        this.key = apiKey;
        this.url = options.url || 'https://osu.ppy.sh/api';
        this.resAsError = options.resAsError || true;
    }
    callToApi(ePoint, options) {
        return new Promise((resolve, reject) => {
            if(!this.key) return reject(new Error(`osu! Api Key not set. You can ask for help - https://discord.gg/qv7KcNq`))
            options['k'] = this.key;
            agent.get(this.url + ePoint).set('User-Agent', UAgent).query(options).end((err, res) => {
                if(!err && res.status === 200) resolve(res.body);
                else reject(new Error(err.status || err.response));
            })
        })
    }
    getBeatmap(options) {
        return new Promise((resolve, reject) => {
            this.callToApi(`/get_beatmaps`, options).then(res => {
                if(res.length === 0) return this.resAsError ? reject(new Error('Beatmap not found :( What can cause this, you can ask - https://discord.gg/qv7KcNq')) : resolve(res)
                resolve(res.map(beatmap => new Beatmap(beatmap))[0])
            }).catch(reject)
        })
    }
    getUser(options) {
        return new Promise((resolve, reject) => {
            this.callToApi('/get_user', options).then(res => {
                if(res.length === 0) return this.resAsError ? reject(new Error('User not found :( What can cause this, you can ask - https://discord.gg/qv7KcNq')) : resolve(res)
                resolve(new Player(res[0]))
            }).catch(reject)
        })
    }
    getScores(options) {
        return new Promise((resolve, reject) => {
            this.callToApi('/get_user', options).then(res => {
                if(res.length === 0) return this.resAsError ? reject(new Error('No scores :( What can cause this, you can ask - https://discord.gg/qv7KcNq')) : resolve(res)
                resolve(res.map(score => new Score(score)));
                // this.getBeatmap({b: options.b}).then(bm => {
                //     return resolve(res.map(score => new Score(score)), bm[0])
                // }).catch(reject);
            }).catch(reject);
        })
    }
    getUserBS(options) {
        return new Promise((resolve, reject) => {
            this.callToApi('/get_user_best', options).then(res => {
                if(res.length === 0) return this.resAsError ? reject(new Error('No best scores :( What can cause this, you can ask - https://discord.gg/qv7KcNq')) : resolve(res);
                resolve(res.map(bs => new Score(bs)))
            }).catch(reject)
        })
    }
    getUserRecent(options) {
		return new Promise((resolve, reject) => {
			this.callToApi('/get_user_recent', options).then(res => {
				if (res.length === 0) return this.resAsError ? reject(new Error('No recent scores :( What can cause this, you can ask - https://discord.gg/qv7KcNq')) : resolve(res);
				resolve(res.map(score => new Score(score)));
			}).catch(reject);
		});
	}
}
module.exports = Api;