import EventsList from "../Components/Events/EventsList";
import { useEffect, useState } from "react";
import { databasePath } from "../App";
import axios from "axios";

const HomePage = () => {
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
				<h1>Welcome to Eventz!</h1>
				<p>
					The ultimate destination for hosting, discovering, and sharing events!
					Whether you're planning a gathering or seeking the next big thing to
					attend, Eventz has you covered.
				</p>

				<p>
					With our vast database of events, you can easily browse through a wide
					array of happenings in your area or beyond. From concerts to
					conferences, parties to seminars, there's something for everyone.
				</p>
			</div>
		</section>
	);
};
export default HomePage;
