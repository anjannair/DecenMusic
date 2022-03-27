import { useParams } from "react-router";
import { connect } from "react-redux";
import { changeTrack } from "../actions";
import Topnav from "../component/topnav/topnav";
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from "../component/buttons/play-button";
import IconButton from "../component/buttons/icon-button";
import PlaylistDetails from "../component/playlist/playlist-details";
import PlaylistTrack from "../component/playlist/playlist-track";
import * as Icons from "../component/icons";
import { PLAYLIST } from "../data/index";

import styles from "./playlist.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

function PlaylistPage(props) {
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	const [isthisplay, setIsthisPlay] = useState(false);
	const { path } = useParams();

	const [user, setUser] = useState(false);
	const [song, setSong] = useState(false);
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(false);
	const [artist, setArtist] = useState(false);

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

	useEffect(() => {
		axios.get(`${config.api_location}/song/id/${path}`).then((res) => {
			setSong(res.data);
			setLikes(res.data.likes.length);
		});
	}, [path]);

	useEffect(() => {
		axios.post(
			`${config.api_location}/song/view`,
			{ id: song._id },
			{ headers: { token: localStorage.token } }
		);
		if (song)
			axios
				.get(`${config.api_location}/user/${song.artist}`)
				.then((res) => setArtist(res.data));
	}, [song]);

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0]);
	});

	return song ? (
		<div className={styles.PlaylistPage}>
			<img src={`${config.ipfs_location}/ipfs/${song.thumbnailHash}`} />
			<h1>{song.title}</h1>
			<h2>by {artist.username}</h2>
			<h2>#{song.tag}</h2>
			<h2
				onClick={() => {
					axios
						.post(
							`${config.api_location}/song/like`,
							{ id: song._id },
							{ headers: { token: localStorage.token } }
						)
						.then(() => {
							setLiked(true);
							setLikes((prevState) => prevState + 1);
						});
				}}
			>
				{liked ? <>💖</> : <>❤️</>}: {likes}
			</h2>
			<h2>👀: {song.views}</h2>
			<div id="disqus_thread"></div>
			{
				/**
				 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
				 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
				/*
    var disqus_config = function () {
    this.page.url = song._id;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
				(function () {
					// DON'T EDIT BELOW THIS LINE
					var d = document,
						s = d.createElement("script");
					s.src = "https://localhost-q5ick0dfxj.disqus.com/embed.js";
					s.setAttribute("data-timestamp", +new Date());
					(d.head || d.body).appendChild(s);
				})()
			}
			<noscript>
				Please enable JavaScript to view the{" "}
				<a href="https://disqus.com/?ref_noscript">
					comments powered by Disqus.
				</a>
			</noscript>
		</div>
	) : null;
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
	};
};

export default connect(mapStateToProps, { changeTrack })(PlaylistPage);
