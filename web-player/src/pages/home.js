import Topnav from "../component/topnav/topnav";
import TitleL from "../component/text/title-l";
import TitleM from "../component/text/title-m";
import PlaylistCardS from "../component/cards/playlist-card-s";
import PlaylistCardM from "../component/cards/playlist-card-m";

import styles from "./home.module.css";

import { PLAYLIST } from "../data/index";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

function Home() {
	const [user, setUser] = useState(false);

	useEffect(() => {
		if (localStorage.token) {
			axios
				.get(`${config.api_location}/user/self`, {
					headers: { token: localStorage.token },
				})
				.then((res) => {
					setUser(res.data);
				});
		}
	}, []);

	return (
		<div className={styles.Home}>
			<div className={styles.HoverBg}></div>
			<div className={styles.Bg}></div>

			<Topnav />
			<div className={styles.Content}>
				<section>
					<div className={styles.SectionTitle}>
						<TitleL>
							{user
								? `Hello ${user.username}`
								: "Sign in to get personalized reccomendations!"}
						</TitleL>
					</div>

					<div className={styles.SectionCards}>
						{PLAYLIST.map((item) => {
							return <PlaylistCardS key={item.title} data={item} />;
						})}
					</div>
				</section>

				{user ? (
					<section>
						<div className={styles.SectionTitle}>
							<TitleM>Recently Played</TitleM>
						</div>

						<div className={styles.SectionCardsMedium}>
							{PLAYLIST.slice(0, 6).map((item) => {
								return <PlaylistCardM key={item.title} data={item} />;
							})}
						</div>
					</section>
				) : null}
			</div>
		</div>
	);
}

export default Home;
