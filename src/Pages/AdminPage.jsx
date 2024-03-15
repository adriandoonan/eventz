import Auth from "../Components/Forms/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { databasePath } from "../App";
import { useEffect, useState } from "react";

const AdminPage = ({
	isAuthenticated,
	setIsAuthenticated,
	needsAuth,
	setNeedsAuth,
}) => {
	const [users, setUsers] = useState(null);

	const getUsers = async () => {
		const request = await axios.get(`${databasePath}/users`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("jwtToken")}`,
			},
		});
		const response = await request.data;
		console.log(response);
		setUsers(response);
	};

	useEffect(() => {
		console.log("needs auth", needsAuth);
	}, []);

	useEffect(() => {
		const dialog = document.querySelector("#login-dialog");
		const currentToken = Cookies.get("jwtToken");
		if (currentToken && `${jwtDecode(currentToken).exp}000` - Date.now() < 0) {
			console.log("yo, this dudes token has expired!");
			setIsAuthenticated(false);
			setNeedsAuth(true);
		}
		if (currentToken && `${jwtDecode(currentToken).exp}000` - Date.now() > 0) {
			console.log("yo, this dudes token is still valid!");
			setIsAuthenticated(true);
		}
		setNeedsAuth(true);
		console.log("needs after", needsAuth);
		dialog.show();
		isAuthenticated && getUsers();
		dialog.close();
	}, [isAuthenticated]);

	return (
		<div>
			<h1>AdminPage</h1>

			<button
				type="button"
				onClick={() => {
					setIsAuthenticated(!isAuthenticated);
				}}
			>
				Toggle auth state
			</button>

			<h2>Users</h2>
			{isAuthenticated &&
				users?.map(({ firstname, lastname, id }) => (
					<p key={id}>
						{id}: {firstname} {lastname}
					</p>
				))}

			<Auth
				needsAuth={needsAuth}
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
		</div>
	);
};
export default AdminPage;
