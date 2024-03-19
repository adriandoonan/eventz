import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DATABASE_PATH, dateToNormal } from "../App";

const EventDetailPage = () => {
	const [event, setEvent] = useState(null);
	const { eventSlug } = useParams();
	const navigate = useNavigate();

	const getTheEvent = async () => {
		const request = await axios(`${DATABASE_PATH}/events`, {
			params: {
				slug: eventSlug,
			},
		});
		const response = await request.data;
		//console.log(response);
		setEvent(response[0]);
		return response;
	};

	useEffect(() => {
		//console.log(eventSlug);
		getTheEvent();
		//console.log("my-event", event);
	}, []);

	if (event == null) {
		return <h1>fetching event details</h1>;
	}
	if (event.id === undefined) {
		return <h1>Couldn't find details for that event</h1>;
	}
	const { name, description, organiser, promoImage, featuredEvent, tags } =
		event;
	//dayAndDate,timeAndTimeZone
	const { dayAndDate: startDate, timeAndTimeZone: startTime } = dateToNormal(
		event.startDate,
	);
	const { dayAndDate: endDate, timeAndTimeZone: endTime } = dateToNormal(
		event.endDate,
	);
	document.title = `Eventz! | ${name}`;
	return (
		<>
			<div className="event-details">
				<h1>{name}</h1>
				<article className="event-details-hero">
					<img src={promoImage} alt={name} />
					<h2>{featuredEvent ? "Featured Event" : ""}</h2>
				</article>
				<article className="event-details-tag-container">
					{tags.map(({ value, label }) => (
						<span key={value} className="event-details-tag">
							{label}
						</span>
					))}
				</article>
				<p className="event-details-page-times">
					This event is happening from {startDate} at {startTime} to {endDate}{" "}
					at {endTime}.
				</p>

				{description.split("\n").map((paragraph, index) => {
					return <p key={index}>{paragraph}</p>;
				})}
				<p className="event-details-organiser">
					Brought to you by <strong>{organiser}</strong>
				</p>
			</div>
			<button type="button" onClick={() => navigate(-1)}>
				Back
			</button>
		</>
	);
};
export default EventDetailPage;
