import SubmitEventForm from "../Components/Forms/SubmitEventForm";
import { DATABASE_PATH, makeToast } from "../App";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SubmitEventPage = ({ state, dispatch }) => {
	const [submitted, setSubmitted] = useState(false);

	const emptyForm = {
		// id: 5, we would generate the id on saving to the api
		// slug: "", we can do this on submit
		name: "",
		description: "",
		location: "",
		// locationCoords: "37.7749, -122.4194", // would we need to call an api to get the city coords?
		venue: "",
		startDate: "", //new Date().toISOString().slice(0, -8),
		endDate: "", //new Date().toISOString().slice(0, -8),
		organiser: "",
		tags: null, // we would need to provide a list of possible tags
		promoImage: "",
		images: [
			{
				url: "",
				altText: "",
				credit: "",
			},
		],
	};

	const submitToDB = async (event, state) => {
		event.preventDefault();
		//console.log(event);
		try {
			const request = await axios.post(`${DATABASE_PATH}/submissions`, {
				...state,
				pendingApproval: true,
				slug: state.name.trim().toLowerCase().replaceAll(" ", "-"),
				created: new Date(),
			});
			const response = await request.data;
			//console.log(response);
			makeToast("Event submitted", "😎");
			setSubmitted(true);
		} catch (error) {
			console.error("problem submitting event", error);
			makeToast("Problems submitting event", "🥵");
		}
	};
	if (submitted) {
		return (
			<article
				className="container"
				style={{ margin: "0 auto", textAlign: "center" }}
			>
				<h1 style={{ margin: "0 auto", padding: "2rem" }}>
					Thanks for submitting your event!
				</h1>
				<img
					style={{ margin: "0 auto" }}
					src="https://c.tenor.com/eEMB7T6hU7wAAAAC/tenor.gif"
					alt="eventz team at work"
				/>
				<p style={{ margin: "0 auto", padding: "2rem" }}>
					One of our team will review your submission and get back to you if
					there are any questions.{" "}
				</p>
				<p>Miaow, miaow, miaow</p>
			</article>
		);
	}
	return (
		<>
			<h1>Submit an event</h1>
			<section className="submit-event-form-container">
				<SubmitEventForm
					submitToDB={submitToDB}
					initialState={emptyForm}
					state={state}
					dispatch={dispatch}
				/>
			</section>
		</>
	);
};
export default SubmitEventPage;
