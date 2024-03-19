import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { databasePath } from "../App";

const EventDetailPage = () => {
	const [event, setEvent] = useState(null);
	const { eventSlug } = useParams();

	const getTheEvent = async () => {
		const request = await axios(`${databasePath}/events`, {
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
	const {
		name,
		startDate,
		endDate,
		description,
		organisers,
		promoImage,
		featuredEvent,
		tags,
	} = event;
	document.title = `Eventz! | ${name}`;
	return (
		<div className="event-details">
			<h1>{name}</h1>
			<article className="event-detail-hero">
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
			<p>
				This event is happening from {startDate} to {endDate} and is organised
				by {organisers}
			</p>
			{description.split("\n").map((paragraph, index) => {
				return <p key={index}>{paragraph}</p>;
			})}
		</div>
	);
};
export default EventDetailPage;
