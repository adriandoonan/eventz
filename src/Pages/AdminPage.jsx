import Auth from "../Components/Forms/Auth";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DATABASE_PATH, dateToNormal, makeToast } from "../App";
import { useEffect, useState } from "react";
import EventDetailView from "../Components/Events/EventDetailView";

const AdminPage = ({
	isAuthenticated,
	setIsAuthenticated,
	needsAuth,
	setNeedsAuth,
}) => {
	const [users, setUsers] = useState(null);
	const [submissions, setSubmissions] = useState(null);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewEvent, setPreviewEvent] = useState(null);

	const getUsers = async () => {
		const request = await axios.get(`${DATABASE_PATH}/users`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("jwtToken")}`,
			},
		});
		const response = await request.data;
		console.log(response);
		setUsers(response);
	};

	const handleDelete = async (id, name) => {
		try {
			const request = await axios.delete(`${DATABASE_PATH}/submissions/${id}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("jwtToken")}`,
				},
			});
			const response = await request.data;
			console.log("successfully deleted", response);
			makeToast(`${name} rejected`, "🚮");
			setSubmissions(submissions.filter((submission) => submission.id !== id));
		} catch (error) {
			console.error("there was an error deleting the event", error);
		}
	};

	const handleApprove = async (id) => {
		try {
			const getSubmission = await axios.get(
				`${DATABASE_PATH}/submissions/${id}`,
			);
			const getSubmissionResponse = await getSubmission.data;
			const approvedEvent = getSubmissionResponse;
			approvedEvent.id = null;
			approvedEvent.approvedDate = new Date();
			const addToEvents = await axios.post(
				`${DATABASE_PATH}/events`,
				approvedEvent,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtToken")}`,
					},
				},
			);
			const addToEventsResponse = await addToEvents.data;
			const removeFromSubmissions = await axios.delete(
				`${DATABASE_PATH}/submissions/${id}`,
			);
			const removeFromSubmissionsResponse = await removeFromSubmissions.data;
			setSubmissions(submissions.filter((submission) => submission.id !== id));

			console.log(
				`event created with id: ${addToEventsResponse.id}`,
				addToEventsResponse,
			);
			makeToast(
				`${addToEventsResponse.name} approved and given id ${addToEventsResponse.id}, tell your friends`,
				"🎉",
			);
		} catch (error) {
			console.error("there was an error approving the event", error);
			makeToast("oops, we had an error", "🥵");
		}
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

	const getCurrentSubmissions = async () => {
		if (isAuthenticated) {
			try {
				const request = await axios.get(`${DATABASE_PATH}/submissions`, {
					headers: {
						Authorization: `Bearer ${Cookies.get("jwtToken")}`,
					},
				});
				const response = await request.data;
				console.log(response);
				setSubmissions(response);
			} catch (error) {
				console.log("had a problem getting submissions", error);
			}
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			getCurrentSubmissions();
		}
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

			<h2>Submissions</h2>
			{isAuthenticated && (
				<table>
					<thead>
						<tr>
							<th>submitted on</th>
							<th>submitted by</th>
							<th>name</th>
							<th>description</th>
							<th>image</th>
							<th>actions</th>
						</tr>
					</thead>

					<tbody>
						{submissions?.map(
							({
								created,
								organiser,
								name,
								description,
								promoImage,
								id,
								startDate,
								endDate,
							}) => (
								<tr key={id}>
									<td>
										{dateToNormal(created).dayAndDate}
										<br />
										{dateToNormal(created).timeAndTimeZone}
									</td>
									<td>{organiser}</td>
									<td>{name}</td>
									<td>{description}</td>
									<td>
										<img
											className="admin-panel-image-preview"
											src={promoImage}
											alt={`promo pic for ${name}`}
										/>
									</td>
									<td style={{ display: "flex", flexDirection: "column" }}>
										<button
											type="button"
											className="primary"
											onClick={() => {
												setPreviewEvent({
													organiser,
													name,
													description,
													promoImage,
													id,
													startDate,
													endDate,
												});
												setPreviewOpen(true);
											}}
										>
											preview
										</button>
										<button type="button" className="primary">
											edit
										</button>
										<button
											type="button"
											className="secondary"
											onClick={() => handleApprove(id)}
										>
											approve
										</button>
										<button
											type="button"
											className="contrast"
											onClick={() => handleDelete(id, name)}
										>
											reject
										</button>
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			)}

			<dialog id="preview-dialog" open={previewOpen}>
				<button type="button" onClick={() => setPreviewOpen(false)}>
					Close
				</button>
				{previewEvent && <EventDetailView {...previewEvent} />}
			</dialog>

			<Auth
				needsAuth={needsAuth}
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
		</div>
	);
};
export default AdminPage;
