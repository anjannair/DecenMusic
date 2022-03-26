import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TitleM from "../component/text/title-m";
import Topnav from "../component/topnav/topnav";
import PlaylistCardM from "../component/cards/playlist-card-m";
import { PLAYLIST } from "../data/index";
import { useState, useEffect } from "react";

import styles from "./library.module.css";
import axios from "axios";
import config from "../config";

function Library() {
	const [user, setUser] = useState(false);
	const [userMusic, setUserMusic] = useState([]);

	useEffect(() => {
		if (localStorage.token) {
			axios
				.get(`${config.api_location}/user/self`, {
					headers: { token: localStorage.token },
				})
				.then((res) => {
					setUser(res.data);
					axios
						.get(`${config.api_location}/song`, {
							headers: { token: localStorage.token },
						})
						.then((res) => {
							setUserMusic(
								res.data.filter((e) => String(e.author) == String(user._id))
							);
						});
				});
		}
	}, []);

	return (
		<div className={styles.LibPage}>
			<Topnav tabButtons={true} />
			<div className={styles.Library}>
				{userMusic.map((song) => (
					<>
						<a href={`/playlist/${song._id}`}>
							<h3>{song.title}</h3>
						</a>
						<h5>views: {song.views}</h5>
						<h5>likes: {song.likes.length}</h5>
						<h5>
							avg watch percentage:{" "}
							{song.listens.reduce((a, b) => a + b, 0) / song.listens.length}
						</h5>
						<hr />
					</>
				))}
			</div>
		</div>
	);
}

export default Library;
