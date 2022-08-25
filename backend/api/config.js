require("dotenv").config();

module.exports = {
	server: {
		port: process.env.PORT || 5000,
	},
	db: {
		string: process.env.DB_STRING,
		cleanInterval: 1000 * 60 * 5, // 5 min
	},
	ipfs: {
		host: "192.168.98.242",
		port1: 5001,
		protocol: "http",
		port2: 8080,
	},
	songs: {
		tags: ["rock", "pop", "classical", "instrumental", "heavy metal"],
	},
	auth: {
		requiresEmailVerification: false,
		roles: {
			list: ["user", "admin"],
			default: "user",
		},
		otp: {
			length: 16,
			validFor: 1000 * 60 * 30, // 30 min
		},
		password: {
			length: {
				min: 8,
				max: 128,
			},
			hashingRounds: 10,
		},
		token: {
			validFor: 1000 * 60 * 60 * 24 * 7, // 1 week
			length: 32,
		},
	},
};
