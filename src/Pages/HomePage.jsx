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
					At Eventz, we're passionate about bringing people together through the
					magic of events. Our journey began with a simple idea: to create a
					platform where individuals and organizations alike could easily host,
					discover, and share events of all kinds.
				</p>

				<p>
					Driven by a team of dedicated professionals, including UX designers,
					developers, and event enthusiasts, we've built Eventz from the ground
					up with one goal in mind: to revolutionize the event industry.
				</p>

				<p>
					With a focus on user experience and cutting-edge technology, we've
					crafted a seamless and intuitive platform that empowers our users to
					unleash their creativity and connect with like-minded individuals.
				</p>

				<p>
					But Eventz is more than just a website - it's a community. We believe
					in the power of events to inspire, unite, and enrich lives, and we're
					committed to fostering a vibrant and inclusive environment where
					everyone feels welcome.
				</p>

				<p>
					Whether you're an event organizer looking to promote your latest
					gathering, or simply someone on the hunt for the next big thing to
					attend, Eventz has something for you. From intimate workshops to
					massive festivals, our database boasts a diverse array of events to
					suit every taste and interest.
				</p>

				<p>
					But don't just take our word for it - join the thousands of users who
					have already experienced the magic of Eventz for themselves. Together,
					let's make every moment unforgettable. Welcome to Eventz - where the
					possibilities are endless.
				</p>
			</div>
		</section>
	);
};
export default HomePage;
