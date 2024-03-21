import { Link } from "react-router-dom";

const EventTile = ({ event }) => {
	const { id, name, slug, promoImage, featured } = event;
	//console.log("event props", id);

	if (!id) {
		return;
	}

	return id >= 0 ? (
		<article className={`event-tile ${featured ? "featured" : ""}`}>
			<Link to={`/events/${slug}`} className="event-tile-clickable">
				<img src={promoImage} alt={name} />
				<h2>{name}</h2>
			</Link>
		</article>
	) : (
		<article className="event-tile placeholder" id={`placeholder-${id}`}>
			<a href="#" className="event-tile-non-clickable">
				<img src={promoImage} alt="placeholder event" />
				<h2>placeholder</h2>
			</a>
		</article>
	);
};
export default EventTile;
