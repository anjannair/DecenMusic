const mongoose = require("mongoose");
const config = require("../config");

const listenSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	percentage: {
		type: Number,
		required: true,
	},
});

const userListSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const songSchema = mongoose.Schema(
	{
		artist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		listens: {
			type: [listenSchema],
			default: [],
		},
		title: {
			type: String,
			required: true,
		},
		likes: {
			type: [userListSchema],
			default: [],
		},
		dislikes: {
			type: [userListSchema],
			default: [],
		},
		hash: {
			type: String,
			required: true,
		},
		thumbnailHash: {
			type: String,
		},
		tag: {
			type: String,
			enum: config.songs.tags,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
