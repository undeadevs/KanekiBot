
module.exports = {
    mods: {
		"None"          : 0,
		"NoFail"        : 1,
		"Easy"          : 1 << 1,
		"NoVideo"       : 1 << 2,
		"Hidden"        : 1 << 3,
		"HardRock"      : 1 << 4,
		"SuddenDeath"   : 1 << 5,
		"DoubleTime"    : 1 << 6,
		"Relax"         : 1 << 7,
		"HalfTime"      : 1 << 8,
		"Nightcore"     : 1 << 9,
		"Flashlight"    : 1 << 10,
		"Autoplay"      : 1 << 11,
		"SpunOut"       : 1 << 12,
		"Autopilot"     : 1 << 13,
		"Perfect"       : 1 << 14,
		"Key4"          : 1 << 15,
		"Key5"          : 1 << 16,
		"Key6"          : 1 << 17,
		"Key7"          : 1 << 18,
		"Key8"          : 1 << 19,
		"keyMod"        : 1015808,
		"FadeIn"        : 1 << 20,
		"Random"        : 1 << 21,
		"LastMod"       : 1 << 22,
		"FreeModAllowed": 2077883,
		"Key9"          : 1 << 23,
		"Key10"         : 1 << 24,
		"Key1"          : 1 << 25,
		"Key3"          : 1 << 26,
		"Key2"          : 1 << 27
    },
    beatmaps: {
        status: {
            "-2": "Graveyard ⚰",
        "-1": "WIP",
        "0": "Pending",
        "1": "Ranked",
        "2": "Approved",
        "3": "Qualified 👍",
        "4": "Loved <3"
        },
        genre: {
			"0": "Any",
			"1": "Unspecified",
			"2": "Video Game",
			"3": "Anime",
			"4": "Rock",
			"5": "Pop",
			"6": "Other",
			"7": "Novelty",
			"9": "Hip Hop",
			"10": "Electronic"
		},
		lang: {
			"0": "Any",
			"1": "Other",
			"2": "English",
			"3": "Japanese",
			"4": "Chinese",
			"5": "Instrumental",
			"6": "Korean",
			"7": "French",
			"8": "German",
			"9": "Swedish",
			"10": "Spanish",
			"11": "Italian"
		},
		mode: {
			"0": "Standart",
			"1": "Taiko",
			"2": "Catch the Beat",
			"3": "Mania"
		}
    },
    multi: {
        scoreType: {
            "0": "Score",
            "1": "Accuracy",
            "2": "Combo",
            "4": "Score v2"
        },
        teamType: {
            "0": "Head to Head",
            "1": "Tag Coop",
            "2": "Team VS",
            "3": "Tag Team VS"
        },
        team: {
            "0": "None",
            "1": "Blue",
            "2": "Red"
        }
    },
    accuracyCalculation: {
        //Press F to pay Accuracy
        Standard: f => {
			let total = f['50'] + f['100'] + f['300'] + f.miss;
			return total === 0 ? 0 : ((f['300'] * 300 + f['100'] * 100 + f['50'] * 50) / (total * 300));
		},
		Taiko: f => {
			let total = f['100'] + f['300'] + f.miss;
			return total === 0 ? 0 : (((f['300'] + f['100'] * .5) * 300) / (total * 300));
		},
		'Catch the Beat': f => {
			let total = f['50'] + f['100'] + f['300'] + f.katu + f.miss;
			return total === 0 ? 0 : ((f['50'] + f['100'] + f['300']) / total);
		},
		Mania: f => {
			let total = f['50'] + f['100'] + f['300'] + f.katu + f.geki + f.miss;
			return total === 0 ? 0 : ((f['50'] * 50 + f['100'] * 100 + f.katu * 200 + (f['300'] + f.geki) * 300) / (total * 300));
		}
    }
}