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

	const [song, setSong] = useState(false);

	useEffect(() => {
		axios.get(`${config.api_location}/song/id/${path}`).then((res) => {
			setSong(res.data);
		});
	}, [path]);

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0]);
	});

	return (
		<div className={styles.PlaylistPage}>
			
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
	};
};

export default connect(mapStateToProps, { changeTrack })(PlaylistPage);
