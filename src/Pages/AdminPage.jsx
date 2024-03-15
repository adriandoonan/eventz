import Auth from "../Components/Forms/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { databasePath } from "../App";
import { useEffect, useState } from "react";

const AdminPage = ({ isAuthenticated, setIsAuthenticated }) => {
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
		getUsers();
	}, [isAuthenticated]);

	return (
		<div>
			<h1>AdminPage</h1>

			<h2>Users</h2>
			{isAuthenticated &&
				users?.map(({ firstname, lastname, id }) => (
					<p>
						{id}: {firstname} {lastname}
					</p>
				))}

			<Auth
				isOpen={true}
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
		</div>
	);
};
export default AdminPage;
