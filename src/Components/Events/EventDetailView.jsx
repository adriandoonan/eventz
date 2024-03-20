import { dateToNormal } from "../../App";

const EventDetailView = ({
	name,
	promoImage,
	featuredEvent,
	tags,
	description,
	organiser,
	startDate,
	endDate,
}) => {
	//dayAndDate,timeAndTimeZone
	const { dayAndDate: start, timeAndTimeZone: startTime } =
		dateToNormal(startDate);
	const { dayAndDate: end, timeAndTimeZone: endTime } = dateToNormal(endDate);
	return (
		<div className="event-details">
			<h1>{name}</h1>
			<article className="event-details-hero">
				<img src={promoImage} alt={name} />
				<h2>{featuredEvent ? "Featured Event" : ""}</h2>
			</article>
			<article className="event-details-tag-container">
				{tags?.map(({ value, label }) => (
					<span key={value} className="event-details-tag">
						{label}
					</span>
				))}
			</article>
			<p className="event-details-page-times">
				This event is happening from {start} at {startTime} to {end} at{" "}
				{endTime}.
			</p>

			{description.split("\n").map((paragraph, index) => {
				return <p key={index}>{paragraph}</p>;
			})}
			<p className="event-details-organiser">
				Brought to you by <strong>{organiser}</strong>
			</p>
		</div>
	);
};
export default EventDetailView;
