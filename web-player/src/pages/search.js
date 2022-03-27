import Topnav from "../component/topnav/topnav";
import TitleM from "../component/text/title-m";
import SearchPageCard from "../component/cards/searchpage-card";
import { SEARCHCARDS } from "../data/index";

import styles from "./search.module.css";
import axios from "axios";
import config from "../config";
import { useState, useEffect } from "react";

function Search() {
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios
			.get(`${config.api_location}/song`)
			.then((res) => setResults(res.data));
	}, []);

	return (
		<div className={styles.SearchPage}>
			<Topnav search={false} />

			<div className={styles.Search}>
				<input
                    autoFocus
					type="text"
					placeholder="search"
					onChange={(e) => {
						const query = e.target.value;

						axios
							.get(`${config.api_location}/song/search?q=${query}`)
							.then((res) => {
								setResults(res.data);
							});
					}}
				/>

				<TitleM>Browse All</TitleM>
				<div className={styles.SearchCardGrid}>
					{results.map((card) => {
						return (
							<SearchPageCard
								key={card.title}
								cardData={{
									bgcolor: "rgb(0,0,0)",
									title: card.title,
									id: card._id,
									imgurl: `${config.ipfs_location}/ipfs/${card.thumbnailHash}`,
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Search;
