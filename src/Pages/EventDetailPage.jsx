import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DATABASE_PATH } from "../App";
import EventDetailView from "../Components/Events/EventDetailView";

const EventDetailPage = () => {
	const [event, setEvent] = useState("fetching");
	const { eventSlug } = useParams();
	const navigate = useNavigate();

	const getTheEvent = async () => {
		const request = await axios(`${DATABASE_PATH}/events`, {
			params: {
				slug: eventSlug,
			},
		});
		const response = await request.data;
		console.log(response);
		setEvent(response[0]);
		return response;
	};

	useEffect(() => {
		//console.log(eventSlug);
		getTheEvent();
		console.log("my-event", event);
	}, []);

	if (event === "fetching") {
		return <h1>fetching event details</h1>;
	}
	if (!event) {
		return (
			<article
				className="container"
				style={{ marginTop: "3rem", padding: "1rem", placeContent: "center" }}
			>
				<h1 style={{ margin: "0 auto" }}>
					Couldn't find details for that event
				</h1>
				<img
					src="https://c.tenor.com/KK8xVmSworgAAAAC/tenor.gif"
					alt="page not found"
					style={{ margin: "0 auto" }}
				/>
				<h3 style={{ margin: "0 auto" }}>
					You must have zigged when you should have zagged
				</h3>
				<button type="button" onClick={() => navigate(-1)}>
					Go back
				</button>
			</article>
		);
	}

	document.title = `Eventz! | ${event.name}`;
	return (
		<>
			<EventDetailView {...event} />
		</>
	);
};
export default EventDetailPage;
