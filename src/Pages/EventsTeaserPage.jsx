import EventsList from "../Components/Events/EventsList";
import { useEffect, useState } from "react";
import { databasePath } from "../App";
import axios from "axios";

const EventsTeaserPage = () => {
	const [events, setEvents] = useState(null);

	const getEvents = async (limit = null) => {
		try {
			const params = { _limit: limit };
			const request = await axios.get(`${databasePath}/events`, { params });
			const response = await request.data;
			console.log(response);
			setEvents(response);
		} catch (error) {
			console.error("had an error fetching events from database", error);
		}
	};

	useEffect(() => {
		getEvents(5);
	}, []);

	return (
		<section className="homepage">
			<article className="homepage-hero">
				<img
					className="homepage-hero-image"
					src="https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Just one of our great Eventz!"
				/>
				<h1 className="homepage-hero-title">Eventz!</h1>
			</article>
			<div className="homepage-content">
				<p>Hey, you like events? Here are some events!</p>
				{events && <EventsList events={events} />}
			</div>
		</section>
	);
};
export default EventsTeaserPage;
