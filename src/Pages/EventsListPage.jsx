import SideBar from "../Components/Navigation/SideBar";
import EventsList from "../Components/Events/EventsList";
import { useEffect, useState } from "react";
import { DATABASE_PATH } from "../App";
import axios from "axios";

const placeholder = [
	{ id: -1, promoImage: "/assets/placeholder.webp" },
	{ id: -2, promoImage: "/assets/placeholder.webp" },
	{ id: -3, promoImage: "/assets/placeholder.webp" },
	{ id: -4, promoImage: "/assets/placeholder.webp" },
	{ id: -5, promoImage: "/assets/placeholder.webp" },
];

const EventsListPage = () => {
	const [events, setEvents] = useState([]);
	const [page, setPage] = useState(0);
	const [outOfEvents, setOutOfEvents] = useState(false);

	useEffect(() => {
		const observerTarget = document.getElementById("placeholder--2");

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 1,
		};

		const observer = new IntersectionObserver(() => {
			setPage((prevPage) => prevPage + 1);
		}, observerOptions);

		observer.observe(observerTarget);

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	}, []);

	useEffect(() => {
		//console.log("the page changed", page);
		if (page < 1) {
			return;
		}
		const goodPageSize = window.innerWidth > 700 ? 15 : 5;

		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		const getEvents = async (limit = null, page = null) => {
			try {
				const params = {
					_limit: limit,
					_page: page,
					cancelToken: source.token,
				};
				const request = await axios.get(`${DATABASE_PATH}/events`, { params });
				const response = await request.data;

				console.log("response", response);
				if (response.length === 0) {
					console.log("now we would be out of events");
					setOutOfEvents(true);
					return;
				}
				setEvents((prevEvents) => [...prevEvents, ...response]);
				return response;
			} catch (error) {
				if (axios.isCancel(err)) {
					console.log("successfully aborted");
				} else {
					console.error("had an error fetching events from database", error);
				}
			}
		};
		getEvents(goodPageSize, page);
		return () => {
			source.cancel();
		};
	}, [page]);

	return (
		<div className="events-list-page">
			{/* <SideBar /> */}

			{events.length > 0 && <EventsList events={events} />}
			{!outOfEvents && <EventsList events={placeholder} />}
		</div>
	);
};
export default EventsListPage;
