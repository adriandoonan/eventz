import { dateToNormal } from "../../App";
import { useNavigate } from "react-router-dom";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const EventDetailView = ({
	name,
	promoImage,
	featuredEvent,
	tags,
	description,
	organiser,
	startDate,
	endDate,
	venue,
	location,
}) => {
	//dayAndDate,timeAndTimeZone
	const { dayAndDate: start, timeAndTimeZone: startTime } =
		dateToNormal(startDate);
	const { dayAndDate: end, timeAndTimeZone: endTime } = dateToNormal(endDate);
	const navigate = useNavigate();

	return (
		<div className="event-details">
			<h1>{name}</h1>
			<p style={{ textAlign: "right" }}>
				Brought to you by <strong>{organiser}</strong>
			</p>
			<article className="event-details-hero">
				<img src={promoImage} alt={name} />
				<h2>{featuredEvent ? "Featured Event" : ""}</h2>
			</article>

			<article style={{ backgroundColor: "unset", fontSize: "larger" }}>
				<header
					style={{
						width: "unset",
						backgroundColor: "unset",
						height: "fit-content",
					}}
				>
					<span className="event-details-tag-container">
						{tags?.map(({ value, label }) => (
							<span key={value} className="event-details-tag">
								{label}
							</span>
						))}
					</span>
				</header>

				{description.split("\n").map((paragraph, index) => {
					return <p key={index}>{paragraph}</p>;
				})}
				<footer style={{ backgroundColor: "unset" }}>
					<p className="event-details-page-times">
						This event is happening from {start} at{" "}
						{startTime.split(" ").slice(0, 1).join(" ")} to {end} at {endTime}.
					</p>
					<AddToCalendarButton
						name={name}
						options={["Apple", "Google"]}
						location={venue}
						startDate={startDate.split("T")[0]}
						endDate={endDate.split("T")[0]}
						startTime={startDate.split("T")[1].split(":").slice(0, 2).join(":")}
						endTime={endDate.split("T")[1].split(":").slice(0, 2).join(":")}
						timeZone="Europe/Berlin"
					/>
					<br />
					<br />

					<p>
						Find the quickest way from you to the venue on Google maps:
						<br />
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
								venue,
							)}`}
							target="_blank"
							rel="noreferrer"
						>
							{venue}
						</a>{" "}
						in {location}.
					</p>
				</footer>
			</article>
			<button type="button" onClick={() => navigate(-1)}>
				Back
			</button>
		</div>
	);
};
export default EventDetailView;
