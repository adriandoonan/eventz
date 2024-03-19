import { useReducer } from "react";
import axios from "axios";
import { databasePath } from "../../App";
import { makeToast } from "../../App";
import Select from "react-select";

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
	// there won't be any post show images until after the show
	// postShowImages: [
	//   {
	//     url: "https://some.com/tech-conference-post-image1.png",
	//     altText: "Attendees exchanging business cards",
	//     credit: "TechTalk Conferences"
	//   }
	// ]
};

const tags = [
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

const submitToDB = async (event, state) => {
	event.preventDefault();
	//console.log(event);
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
		case "input_organiser": {
			//console.log(action.payload);
			const { name, value } = action.payload.target;
			return {
				...state,
				[name]: value,
			};
		}
		case "input_tags": {
			//console.log("tags", action.payload);
			return { ...state, tags: action.payload };
		}
		case "input_other_images": {
			//console.log("images", action.payload);
			return { ...state };
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
		<form onSubmit={(event) => submitToDB(event, state)} id="submit-event-form">
			<label>Name:</label>
			<input
				type="text"
				value={state.name}
				name="name"
				placeholder="My awesome event..."
				required
				onChange={(event) => dispatch({ type: "input_name", payload: event })}
			/>
			<small>The name of your event</small>

			<label>Description:</label>
			<input
				type="text"
				value={state.description}
				name="description"
				placeholder="This event is really going to be something ..."
				required
				onChange={(event) =>
					dispatch({ type: "input_description", payload: event })
				}
			/>
			<small>A pithy description</small>

			<label>Promo image:</label>
			<input
				type="url"
				value={state.promoImage}
				name="promoImage"
				placeholder="https://images.com/sweet-image.bmp"
				required
				onChange={(event) =>
					dispatch({ type: "input_promo_image", payload: event })
				}
			/>
			<small>URL of an eye-catching image</small>

			<label>Location:</label>
			<input
				type="text"
				value={state.location}
				name="location"
				placeholder="Berlin, Germany"
				required
				onChange={(event) =>
					dispatch({ type: "input_location", payload: event })
				}
			/>
			<small>Where your event will take place</small>

			<label>Venue:</label>
			<input
				type="text"
				value={state.venue}
				name="venue"
				placeholder="Festsaal Kreuzberg"
				required
				onChange={(event) => dispatch({ type: "input_venue", payload: event })}
			/>
			<small>The event venue</small>

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
			<small>When does your event start?</small>

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
			<small>When does your event end?</small>

			<label>Organiser:</label>
			<input
				type="text"
				value={state.organiser}
				name="organiser"
				placeholder="The Event People"
				required
				onChange={(event) =>
					dispatch({ type: "input_organiser", payload: event })
				}
			/>
			<small>The official event organiser</small>

			<label>Tags:</label>
			<Select
				options={tags}
				isMulti={true}
				form="submit-event-form"
				value={state.tags}
				onChange={(event) => dispatch({ type: "input_tags", payload: event })}
			/>
			<small
				style={{ color: "var(--eventz-muted-color)", marginBottom: "16px" }}
			>
				Select tags matching your event
			</small>

			{/* <label>Other images:</label> // Leave this and we can ask for other images once an event has been accepted
			<input
				type="text"
				value={state.images}
				name="images"
				required
				onChange={(event) =>
					dispatch({ type: "input_other_images", payload: event })
				}
			/>
			<small>We'll use any other images in the event details page</small> */}

			<div id="submit-event-form-button-group">
				<button type="submit">Submit Event</button>
				<button
					type="reset"
					onClick={(event) =>
						dispatch({ type: "clear_form_inputs", payload: event })
					}
				>
					Clear
				</button>
			</div>
		</form>
	);
};
export default SubmitEventForm;
