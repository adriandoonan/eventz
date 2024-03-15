import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { databasePath } from "../../App";
import { makeToast } from "../../App";
import { LoginForm } from "./LoginForm";

const setCookie = (key, value, options) => {
	Cookies.set(key, value, options);
};

const Auth = ({ needsAuth, isAuthenticated, setIsAuthenticated }) => {
	const [requestAuth, setRequestAuth] = useState(true);
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	const [badUsername, setBadUsername] = useState(false);
	const [badPassword, setBadPassword] = useState(false);

	const handleLogin = async (event) => {
		event.preventDefault();

		if (isAuthenticated) {
			return;
		}

		setBadPassword(false);
		setBadUsername(false);
		try {
			const requestBody = JSON.stringify(userDetails);
			//console.log("going to send", requestBody);
			const request = await axios.post(`${databasePath}/login`, requestBody, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			//console.log(request);

			const response = await request.data;

			//console.log("got back", response);

			setRequestAuth(false);
			const jwtToken = response.accessToken;

			const decodedJwtToken = jwtDecode(jwtToken);
			//console.log(decodedJwtToken);

			const nowDate = Date.now();
			//console.log(nowDate);

			/// 1710503248563
			/// 1710506848
			const expiresIn = `${decodedJwtToken.exp}000` - nowDate;

			setCookie("jwtToken", jwtToken, {
				expires: expiresIn / (1000 * 60 * 60 * 24),
			});

			setIsAuthenticated(true);
			setBadPassword(false);
			setBadUsername(false);
		} catch (error) {
			console.error("got an error logging in", error);
			makeToast("there was a problem logging you in", "🤷");
			if (
				error.response.status === 400 &&
				error.response.data === "Cannot find user"
			) {
				console.error("could not find user", error.response.data);
				setBadUsername(true);
				console.log("username state", badUsername);
			}
			if (
				error.response.status === 400 &&
				error.response.data === "Incorrect password"
			) {
				console.error(
					"looks like your password is incorrect",
					error.response.data,
				);
				setBadPassword(true);
			}
		}
	};

	return (
		<dialog id="login-dialog" open={needsAuth}>
			<LoginForm
				userDetails={userDetails}
				setUserDetails={setUserDetails}
				handleLogin={handleLogin}
				badPassword={badPassword}
				badUsername={badUsername}
				setIsAuthenticated={setIsAuthenticated}
			/>
		</dialog>
	);
};
export default Auth;
