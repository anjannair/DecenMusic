import TitleM from "../text/title-m";

import styles from "./searchpage-card.module.css";

function SearchPageCard({ cardData }) {
	return (
		<div
			key={cardData.title}
			className={styles.SearchCardBox}
			style={{ backgroundColor: `${cardData.bgcolor}` }}
		>
			<div className={styles.SearchCard}>
				<img src={cardData.imgurl} />
				<a href={`/playlist/${cardData.id}`}>
					<TitleM>{cardData.title}</TitleM>
				</a>
			</div>
		</div>
	);
}

export default SearchPageCard;
