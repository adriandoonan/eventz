import "./App.scss";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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

import localDatabase from "./eventz-db.json";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EventsTeaserPage from "./Pages/EventsTeaserPage";

/** @type {string}  the database path*/
export const databasePath = "http://localhost:6969";

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

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [needsAuth, setNeedsAuth] = useState(false);

	return (
		<>
			<Toaster />
			<HeaderNav isAuthenticated={isAuthenticated} />

			<main className="main-content">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/events-teaser" element={<EventsTeaserPage />} />

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

					<Route path="/submit-event" element={<SubmitEventPage />} />

					<Route path="/about" element={<AboutPage />} />

					<Route
						path="/admin"
						element={
							<AdminPage
								isAuthenticated={isAuthenticated}
								setIsAuthenticated={setIsAuthenticated}
								needsAuth={needsAuth}
								setNeedsAuth={setNeedsAuth}
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
