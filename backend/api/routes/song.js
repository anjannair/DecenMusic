const router = require("express").Router();
const User = require("../models/User");
const Song = require("../models/Song");
const authOnlyMiddleware = require("../middlewares/authOnly");
const filterData = require("../utils/filterData");
const config = require("../config");

// get all songs
router.get("/", async (req, res) => {
	const songs = await Song.find();
	res.send(filterData(songs, req.query));
});

// get all categories
router.get("/tags", async (req, res) => {
	res.send(config.songs.tags);
});

// search
router.get("/search", async (req, res) => {
	const query = req.query.q;
	res.send(
		(await Song.find()).filter((song) =>
			song.title.toLowerCase().includes(query.toLowerCase())
		)
	);
});

// get reccomendation
router.get("/reccomended", authOnlyMiddleware([]), async (req, res) => {
	let songs = await Song.find();

	let likes = {};
	config.songs.tags.forEach((tag) => {
		likes[tag] = 0;
	});

	songs.forEach((song) => {
		song.likes.forEach((like) => {
			if (String(like.user) == String(req.auth.user._id)) {
				likes[song.tag] += 1;
			}
		});
	});

	let favTag = config.songs.tags[0];
	let max = -Infinity;
	config.songs.tags.forEach((tag) => {
		if (likes[tag] > max) {
			favTag = tag;
			max = likes[tag];
		}
	});

	if (max > 0) songs = songs.filter((song) => song.tag === favTag);

	songs.sort((a, b) => b.likes.length - a.likes.length);

	res.json(songs);
});

// get top
router.get("/top", async (req, res) => {
	let songs = await Song.find();
	songs.sort((a, b) => b.views - a.views);

	res.json(songs);
});

// get song by id
router.get("/id/:id", async (req, res) => {
	const song = await Song.findById(req.params.id);
	if (!Song) return res.status(404).json({ msg: "song not found" });
	res.json(song);
});

router.post("/", authOnlyMiddleware([]), async (req, res) => {
	const song = req.body;

	// missing details
	if (!song) return res.status(400).json({ msg: "missing song in body" });
	if (!(song.title && song.hash && song.tag))
		return res.status(400).json({ msg: "missing title, tag or hash" });

	// invalid tag
	if (!config.songs.tags.includes(song.tag))
		return res.status(400).json({ msg: "invalid tag" });

	// create new db entry
	const newSong = new Song({
		artist: req.auth.user,
		title: song.title,
		hash: song.hash,
		tag: song.tag,
		thumbnailHash: song.thumbnailHash,
	});

	res.json(await newSong.save());
});

// like a song
router.post("/like", authOnlyMiddleware([]), async (req, res) => {
	const song = req.body;

	// missing details
	if (!song) return res.status(400).json({ msg: "missing song in body" });
	if (!song.id) return res.status(400).json({ msg: "missing song id" });

	const foundSong = await Song.findById(song.id);
	if (!foundSong) return res.status(404).json({ msg: "song not found" });

	for (let i = 0; i < foundSong.likes.length; i++) {
		if (String(foundSong.likes[i].user) == String(req.auth.user._id))
			return res.json(foundSong);
	}

	foundSong.likes.push({ user: req.auth.user });

	res.json(await foundSong.save());
});

// dislike a song
router.post("/dislike", authOnlyMiddleware([]), async (req, res) => {
	const song = req.body;

	// missing details
	if (!song) return res.status(400).json({ msg: "missing song in body" });
	if (!song.id) return res.status(400).json({ msg: "missing song id" });

	const foundSong = await Song.findById(song.id);
	if (!foundSong) return res.status(404).json({ msg: "song not found" });

	for (let i = 0; i < foundSong.dislikes.length; i++) {
		if (String(foundSong.likes[i].user) == String(req.auth.user._id))
			return res.json(foundSong);
	}

	foundSong.dislikes.push({ user: req.auth.user });

	res.json(await foundSong.save());
});

// view a song
router.post("/view", authOnlyMiddleware([]), async (req, res) => {
	const song = req.body;

	// missing details
	if (!song) return res.status(400).json({ msg: "missing song in body" });
	if (!song.id) return res.status(400).json({ msg: "missing song id" });

	const foundSong = await Song.findById(song.id);
	if (!foundSong) return res.status(404).json({ msg: "song not found" });

	foundSong.views++;

	res.json(await foundSong.save());
});

// listen to a song
router.post("/listen", authOnlyMiddleware([]), async (req, res) => {
	const song = req.body;

	// missing details
	if (!song) return res.status(400).json({ msg: "missing song in body" });
	if (!(song.id && song.percentage))
		return res.status(400).json({ msg: "missing song id or percentage" });

	const foundSong = await Song.findById(song.id);
	if (!foundSong) return res.status(404).json({ msg: "song not found" });

	try {
		for (let i = 0; i < foundSong.likes.length; i++) {
			if (String(foundSong.listens[i].user) == String(req.auth.user._id)) {
				foundSong.listens[i].percentage = song.percentage;
				return res.json(await foundSong.save());
			}
		}
	} catch {}

	foundSong.listens.push({
		user: req.auth.user,
		percentage: song.percentage,
	});

	res.json(await foundSong.save());
});

module.exports = router;
