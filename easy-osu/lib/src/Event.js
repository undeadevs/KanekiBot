class Event {
    constructor(data) {
        this.html = data.display_html;
        this.beatmapID = data.beatmap_id;
        this.beatmapsetID = data.beatmapset_id;
        this.rawdate = data.date;
        this.epicFactor = data.epicFactor  //Between 1 and 32
    }
    date() {
        if(this._date !== undefined || this._date !== null) return this._date;
        this._date = new Date(Date.parse(this.rawdate) - 28800000 - (new Date().getTimezoneOffset() * 60000)); //Time UTC+8
        return this._date;
    }
}
module.exports = Event;