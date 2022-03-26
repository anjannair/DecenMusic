import axios from "axios";
import React, { Component } from "react";
import config from "../config";

function Login() {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const data = {
					username: e.target.username.value,
					password: e.target.password.value,
				};

				console.log({ data });

				axios
					.post(`${config.api_location}/auth/login`, data)
					.then((res) => {
						console.log(res.data.token);
						localStorage.token = res.data.token;
						window.location = "/";
					})
					.catch((err) => {
						alert(err.response.data.msg);
					});
			}}
		>
			<h3>Sign In</h3>

			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter username"
					name="username"
					required
				/>
			</div>

			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter password"
					name="password"
					required
				/>
			</div>

			<button type="submit" className="btn-btn-primary-btn-block">
				Submit
			</button>
		</form>
	);
}

export default Login;
