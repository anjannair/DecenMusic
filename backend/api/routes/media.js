const router = require("express").Router();
const { create } = require("ipfs-http-client");
const config = require("../config");

async function ipfsClient() {
	const ipfs = await create({
		host: config.ipfs.host,
		port: config.ipfs.port1,
		protocol: config.ipfs.protocol,
	});
	return ipfs;
}

router.post("/upload", async (req, res) => {
	// try {
	if (!req.files) {
		res.send({
			status: false,
			message: "No file uploaded",
		});
	} else {
		let uploadedFile = req.files.file;
		// console.log(uploadedFile.data);
		let ipfs = await ipfsClient();

		let options = {
			warpWithDirectory: false,
			progress: (prog) => console.log(`Saved :${prog}`),
		};
		console.log("adding to ipfs");
		let result = await ipfs.add(uploadedFile.data, options);
		result.uri = `${config.ipfs.protocol}://${config.ipfs.host}:${config.ipfs.port2}/ipfs/${result.path}`;
		res.json(result);
	}
	// } catch (err) {
	// 	res.status(500).send(err);
	// }
});

module.exports = router;
