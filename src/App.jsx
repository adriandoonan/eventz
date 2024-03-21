import "./App.scss";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import EventsListPage from "./Pages/EventsListPage";
import EventDetailPage from "./Pages/EventDetailPage";
import PerformersListPage from "./Pages/PerformersListPage";
import PerformerDetailPage from "./Pages/PerformerDetailPage";
import AdminPage from "./Pages/AdminPage";
import SubmitEventPage from "./Pages/SubmitEventPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HeaderNav from "./Components/Navigation/HeaderNav";
import Footer from "./Components/Navigation/Footer";
import AboutPage from "./Pages/AboutPage";
import EventsCalendarPage from "./Pages/EventsCalendarPage";

import { useState, useReducer } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
	eventFormReducer,
	emptyForm,
} from "./Components/Forms/EventFormReducer";

/** @type {string}  the database path*/
export const DATABASE_PATH =
	import.meta.env.VITE_APP_URL || "http://localhost:6969";

export const tags = [
	{ value: "kid-friendly", label: "Kid-Friendly" },
	{ value: "dj-set", label: "DJ Set" },
	{ value: "techno", label: "Techno" },
	{ value: "rock", label: "Rock" },
	{ value: "foodie", label: "Foodie" },
	{ value: "outdoor", label: "Outdoor" },
	{ value: "wellness", label: "Wellness" },
	{ value: "cultural", label: "Cultural" },
	{ value: "networking", label: "Networking" },
	{ value: "interactive", label: "Interactive" },
];

export const makeToast = (message = "Here is your toast.", icon = "👏") => {
	toast(message, {
		duration: 4000,
		position: "top-center",

		// Styling
		style: {},
		className: "",

		// Custom Icon
		icon: icon,

		// Change colors of success/error/loading icon
		iconTheme: {
			primary: "#000",
			secondary: "#fff",
		},

		// Aria
		ariaProps: {
			role: "status",
			"aria-live": "polite",
		},
	});
};

export const dateToNormal = (date) => {
	const dayAndDateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const timeAndTimeZoneOptions = {
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "shortGeneric",
	};

	const myDate = new Date(date);

	const dayAndDate = myDate.toLocaleDateString("en-UK", dayAndDateOptions);
	const timeAndTimeZone = myDate.toLocaleTimeString(
		"en-US",
		timeAndTimeZoneOptions,
	);
	return { dayAndDate, timeAndTimeZone };
};

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [needsAuth, setNeedsAuth] = useState(false);
	const [state, dispatch] = useReducer(eventFormReducer, emptyForm);

	return (
		<>
			<Toaster />
			<HeaderNav isAuthenticated={isAuthenticated} />

			<main className="main-content">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/events" element={<EventsListPage />} />

					<Route path="/events-calendar" element={<EventsCalendarPage />} />

					<Route path="/events/:eventSlug" element={<EventDetailPage />} />

					<Route
						path="/events/:eventSlug/performers"
						element={<PerformersListPage />}
					/>

					<Route
						path="/events/:eventSlug/performers/:performerId"
						element={<PerformerDetailPage />}
					/>

					<Route
						path="/events/submit-event"
						element={<SubmitEventPage state={state} dispatch={dispatch} />}
					/>

					<Route path="/about" element={<AboutPage />} />

					<Route
						path="/admin"
						element={
							<AdminPage
								isAuthenticated={isAuthenticated}
								setIsAuthenticated={setIsAuthenticated}
								needsAuth={needsAuth}
								setNeedsAuth={setNeedsAuth}
								state={state}
								dispatch={dispatch}
							/>
						}
					/>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
