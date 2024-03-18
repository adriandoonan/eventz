import EventsList from "../Components/Events/EventsList";
import { useEffect, useState } from "react";
import { databasePath } from "../App";
import axios from "axios";
import Carousel from "../Components/Carousel";

const HomePage = () => {
	const images = [
		"/src/assets/conference.avif",
		"/src/assets/fair.avif",
		"/src/assets/theatre.avif",
	];
	return (
		<section className="homepage">
			<article className="homepage-hero">
				<img
					className="homepage-hero-image"
					src="/src/assets/demo-image-hero.jpeg"
					alt="Just one of our great Eventz!"
				/>
				<h1 className="homepage-hero-title">Eventz!</h1>
			</article>
			<div className="homepage-content">
				<Carousel images={images} />
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
