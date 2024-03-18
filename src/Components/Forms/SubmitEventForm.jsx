import { useReducer } from "react";
import axios from "axios";
import { databasePath } from "../../App";
import { makeToast } from "../../App";

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
	tags: [], // we would need to provide a list of possible tags
	promoImage: "",
	images: [
		{
			url: "",
			altText: "",
			credit: "",
		},
	],
	// there won't be any post show images until after the show
	// postShowImages: [
	//   {
	//     url: "https://some.com/tech-conference-post-image1.png",
	//     altText: "Attendees exchanging business cards",
	//     credit: "TechTalk Conferences"
	//   }
	// ]
};

const formStyle = {
	maxWidth: "650px",
	margin: "0 auto",
};

const submitToDB = async (event, state) => {
	event.preventDefault();
	try {
		const request = await axios.post(`${databasePath}/events`, {
			...state,
			pendingApproval: true,
			slug: state.name.trim().toLowerCase().replaceAll(" ", "-"),
		});
		const response = await request.data;
		//console.log(response);
		makeToast("Event submitted", "😎");
	} catch (error) {
		console.error("problem submitting event", error);
		makeToast("Problems submitting event", "🥵");
	}
};

const eventFormReducer = (state, action) => {
	switch (action.type) {
		case "input_name":
		case "input_description":
		case "input_promo_image":
		case "input_location":
		case "input_venue":
		case "input_start_date":
		case "input_end_date":
		case "input_organiser":
		case "input_tags":
		case "input_other_images": {
			//console.log(action.payload);
			const { name, value } = action.payload.target;
			return {
				...state,
				[name]: value,
			};
		}
		case "clear_form_inputs": {
			return emptyForm;
		}
		default: {
			console.log("action not supported", action.type, action.payload);
			return state;
		}
	}
};

const SubmitEventForm = () => {
	const [state, dispatch] = useReducer(eventFormReducer, emptyForm);

	return (
		<form onSubmit={(event) => submitToDB(event, state)} style={formStyle}>
			<label>Name:</label>
			<input
				type="text"
				value={state.name}
				name="name"
				placeholder="The name of your event"
				required
				onChange={(event) => dispatch({ type: "input_name", payload: event })}
			/>

			<label>Description:</label>
			<input
				type="text"
				value={state.description}
				name="description"
				placeholder="A pithy description of your event"
				required
				onChange={(event) =>
					dispatch({ type: "input_description", payload: event })
				}
			/>

			<label>Promo image:</label>
			<input
				type="url"
				value={state.promoImage}
				name="promoImage"
				placeholder="URL of an eye-catching image"
				required
				onChange={(event) =>
					dispatch({ type: "input_promo_image", payload: event })
				}
			/>

			<label>Location:</label>
			<input
				type="text"
				value={state.location}
				name="location"
				placeholder="Where your event will take place"
				required
				onChange={(event) =>
					dispatch({ type: "input_location", payload: event })
				}
			/>

			<label>Venue:</label>
			<input
				type="text"
				value={state.venue}
				name="venue"
				placeholder="The event venue"
				required
				onChange={(event) => dispatch({ type: "input_venue", payload: event })}
			/>

			<label>Start:</label>
			<input
				type="datetime-local"
				value={state.startDate}
				name="startDate"
				required
				onChange={(event) =>
					dispatch({ type: "input_start_date", payload: event })
				}
			/>

			<label>End:</label>
			<input
				type="datetime-local"
				value={state.endDate}
				name="endDate"
				required
				onChange={(event) =>
					dispatch({ type: "input_end_date", payload: event })
				}
			/>

			<label>Organiser:</label>
			<input
				type="text"
				value={state.organiser}
				name="organiser"
				placeholder="The official event organiser"
				required
				onChange={(event) =>
					dispatch({ type: "input_organiser", payload: event })
				}
			/>

			<label>Tags:</label>
			<input
				type="text"
				value={state.tags}
				name="tags"
				required
				onChange={(event) => dispatch({ type: "input_tags", payload: event })}
			/>

			<label>Other images:</label>
			<input
				type="text"
				value={state.images}
				name="images"
				required
				onChange={(event) =>
					dispatch({ type: "input_other_images", payload: event })
				}
			/>

			<button type="submit">Submit Event</button>
			<button
				type="reset"
				onClick={(event) =>
					dispatch({ type: "clear_form_inputs", payload: event })
				}
			>
				Clear
			</button>
		</form>
	);
};
export default SubmitEventForm;
