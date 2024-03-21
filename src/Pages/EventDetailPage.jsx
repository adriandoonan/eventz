import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
		return <h1>Couldn't find details for that event</h1>;
	}

	document.title = `Eventz! | ${event.name}`;
	return (
		<>
			<EventDetailView {...event} />

			<button type="button" onClick={() => navigate(-1)}>
				Back
			</button>
		</>
	);
};
export default EventDetailPage;
