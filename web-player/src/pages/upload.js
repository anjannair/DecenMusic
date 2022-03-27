import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../config";
import styles from "./upload.module.css";

function Upload() {
	const [user, setUser] = useState(false);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		if (localStorage.token) {
			axios
				.get(`${config.api_location}/user/self`, {
					headers: { token: localStorage.token },
				})
				.then((res) => {
					setUser(res.data);
				});
			axios.get(`${config.api_location}/song/tags`).then((res) => {
				setTags(res.data);
			});
		}
	}, []);
	return (
		<div className= {styles.form1}>
		<form className={styles.form2}
			onSubmit={(e) => {
				e.preventDefault();

				var formData = new FormData();
				formData.append("file", e.target.file.files[0]);
				axios
					.post(`${config.api_location}/media/upload`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((res) => {
						const hash = res.data.path;

						formData = new FormData();
						formData.append("file", e.target.thumbnail.files[0]);
						axios
							.post(`${config.api_location}/media/upload`, formData, {
								headers: {
									"Content-Type": "multipart/form-data",
								},
							})
							.then((res) => {
								const thumbnailHash = res.data.path;

								const data = {
									title: e.target.title.value,
									tag: e.target.tag.value,
									hash,
									thumbnailHash,
								};

								console.log(data);

								axios
									.post(`${config.api_location}/song/`, data, {
										headers: {
											token: localStorage.token,
										},
									})
									.then((res) => {
										console.log(res.data);
										window.location = "/profile";
									})
									.catch((err) => {
										alert(err.response.data.msg);
									});
							});
					});
			}}
		>
			<label className = {styles.label}><h5>Title</h5></label>
			<input className = {styles.input} required type="text" name="title" placeholder="title" />
			{/* <br></br> */}
			<input required id="file" type="file" name="file" placeholder="file"  />
			<label className = {styles.label}><h5>Thumbnail</h5></label>
			<input
				required
				id="thumbnail"
				type="file"
				name="thumbnail"
				placeholder="thumbnail"
				className = {styles.input}
			/>
			<label className = {styles.label}><h5>Category</h5></label>
			<select className = {styles.input} name="tag" required>
				{tags.map((tag) => (
					<option value={tag}>{tag}</option>
				))}
			</select>
			<input type="submit" id = "submit" className = {styles.submit} />
		</form>
		</div>
	);
}

export default Upload;
