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
		case "overwrite_state": {
			console.log("overwriting", action.payload);
			return action.payload;
		}
		default: {
			console.log("action not supported", action.type, action.payload);
			return state;
		}
	}
};

export { eventFormReducer, emptyForm };
