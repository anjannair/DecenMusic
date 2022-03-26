import PrevPageBtn from "../buttons/prev-page-button";
import NextPageBtn from "../buttons/next-page-button";
import SearchBox from "./search-box";
import LibraryTabBtn from "./library-tab-btn";

import styles from "./topnav.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

function Topnav({ search = false, tabButtons = false }) {
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
		<nav className={styles.Topnav}>
			<div>
				<span>
					<PrevPageBtn />
					<NextPageBtn />
					{search ? <SearchBox /> : ""}
					{tabButtons ? <LibraryTabBtn /> : ""}
				</span>
				<span>
					{user ? (
						<button
							className={styles.ProfileBtn}
							onClick={() => {
								localStorage.clear();
								window.location = "/";
							}}
						>
							Log Out
						</button>
					) : (
						<button
							className={styles.ProfileBtn}
							onClick={() => {
								window.location = "/register";
							}}
						>
							Register
						</button>
					)}
				</span>
			</div>
		</nav>
	);
}

export default Topnav;
