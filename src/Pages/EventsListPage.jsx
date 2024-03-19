import SideBar from "../Components/Navigation/SideBar";
import EventsList from "../Components/Events/EventsList";
import { useEffect, useState } from "react";
import { DATABASE_PATH } from "../App";
import axios from "axios";

const placeholder = [
	{ id: -1, promoImage: "/src/assets/placeholder.webp" },
	{ id: -2, promoImage: "/src/assets/placeholder.webp" },
	{ id: -3, promoImage: "/src/assets/placeholder.webp" },
	{ id: -4, promoImage: "/src/assets/placeholder.webp" },
	{ id: -5, promoImage: "/src/assets/placeholder.webp" },
];

const EventsListPage = () => {
	const [events, setEvents] = useState([]);
	const [outOfEvents, setOutOfEvents] = useState(false);

	const getEvents = async (limit = null, page = null, events = []) => {
		try {
			const params = { _limit: limit, _page: page };
			const request = await axios.get(`${DATABASE_PATH}/events`, { params });
			const response = await request.data;
			console.log("events", events);
			const uniqueEvents = [...events, ...response].filter(
				(event, index, array) => {
					return array.lastIndexOf(({ id }) => event.id === id) !== index;
				},
			);
			console.log("uniques", uniqueEvents);
			if (uniqueEvents.length === 0) {
				console.log("now we would be out of events");
				setOutOfEvents(true);
				return;
			}
			setEvents([...uniqueEvents]);
			return response;
		} catch (error) {
			console.error("had an error fetching events from database", error);
		}
	};

	let counter = 0;
	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 1,
		};

		const observerTarget = document.getElementById("placeholder--2");

		const observer = new IntersectionObserver(() => {
			console.log("here I am, counter", counter);
			console.log("in observer", events);
			getEvents(5, counter, events);
			counter++;
		}, observerOptions);

		observer.observe(observerTarget);

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	}, []);

	return (
		<div className="events-list-page">
			{/* <SideBar /> */}

			{events.length && <EventsList events={events} />}
			{!outOfEvents && <EventsList events={placeholder} />}
		</div>
	);
};
export default EventsListPage;
