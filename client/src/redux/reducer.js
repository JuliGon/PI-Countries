import {
	GET_COUNTRIES,
	GET_COUNTRIES_BY_NAME,
	GET_ACTIVITIES,
	GET_DETAIL,
	POST_ACTIVITY,
	FILTER_BY_ACTIVITY,
	FILTER_BY_REGION,
	ORDER_BY_POPULATION,
	ALPHABETICAL_ORDER,
	CLEAN_DETAIL,
	DELETE_ACTIVITY,
	UPDATE_ACTIVITY,
} from "../redux/actions";

const initialState = {
	countries: [],
	allCountries: [],
	detail: [],
	activities: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIES:
			return {
				...state,
				countries: action.payload,
				allCountries: action.payload,
			};
		case GET_COUNTRIES_BY_NAME:
			return {
				...state,
				countries: action.payload,
			};
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload,
			};
		case POST_ACTIVITY:
			return {
				...state,
			};
		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case FILTER_BY_ACTIVITY:
			const allCountries = state.allCountries; //copia del estado countries que va a tener siempre todas los paises
			const activityFiltered =
				action.payload === "All"
					? allCountries
					: allCountries.filter((c) =>
							c.activities?.map((a) => a.name).includes(action.payload)
					  );
			return {
				...state,
				countries: activityFiltered,
			};
		case FILTER_BY_REGION:
			const allCountriesCopy = state.allCountries;
			const regionFiltered =
				action.payload === "All"
					? allCountriesCopy
					: allCountriesCopy.filter((e) => e.region === action.payload);
			return {
				...state,
				countries: regionFiltered,
			};
		case ORDER_BY_POPULATION:
			let orderByPopulation =
				action.payload === "max"
					? state.countries.sort(function (a, b) {
							if (a.population > b.population) return 1;
							if (b.population > a.population) return -1;
							return 0;
					  })
					: state.countries.sort(function (a, b) {
							if (a.population > b.population) return -1;
							if (b.population > a.population) return 1;
							return 0;
					  });
			return {
				...state,
				countries: orderByPopulation,
			};
		case ALPHABETICAL_ORDER:
			let sortedCountries =
				action.payload === "asc"
					? state.countries.sort((a, b) => a.name.localeCompare(b.name))
					: state.countries.sort((a, b) => b.name.localeCompare(a.name));
			return {
				...state,
				countries: sortedCountries,
			};
		case CLEAN_DETAIL:
			return {
				...state,
				detail: [],
			};
		case DELETE_ACTIVITY:
			const activity = state.activities;
			const activityFilteredCopy = activity.filter(
				(e) => e.id !== action.payload
			);
			return {
				...state,
				activities: activityFilteredCopy,
			};
		case UPDATE_ACTIVITY:
			return {
				...state,
			};
		default:
			return { ...state };
	}
}

export default rootReducer;
