import axios from "axios";
import React, { Component } from "react";
import config from "../config";

function SignUp() {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const data = {
					username: e.target.username.value,
					email: e.target.email.value,
					password: e.target.password.value,
				};

				console.log({ data });

				axios
					.post(`${config.api_location}/auth/register`, data)
					.then((res) => {
						console.log(res);
                        window.location = '/login'
					})
					.catch((err) => {
						alert(err.response.data.msg);
					});
			}}
		>
			<h3>Sign Up</h3>

			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Username"
					name="username"
                    required
				/>
			</div>

			<div className="form-group">
				<label>Email address</label>
				<input
					type="email"
					className="form-control"
					placeholder="Enter email"
					name="email"
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
				Sign Up
			</button>
			<p className="forgot-password text-right">
				Already registered <a href="/login">sign in?</a>
			</p>
		</form>
	);
}

export default SignUp;
