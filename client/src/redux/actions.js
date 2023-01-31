import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_DETAIL = "GET_DETAIL";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";

//mediante las actions se genera la conexión front y back
export function getCountries() {
	return async function (dispatch) {
		try {
			var json = await axios.get("/countries");
			return dispatch({
				type: GET_COUNTRIES,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getCountriesByName(payload) {
	return async function (dispatch) {
		try {
			var json = await axios.get(
				`/countries?name=${payload}`
			);
			return dispatch({
				type: GET_COUNTRIES_BY_NAME,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
			window.alert("Country not found")
		}
	};
}

export function getActivities() {
	return async function (dispatch) {
		try {
			var json = await axios.get("/activities");
			return dispatch({
				type: GET_ACTIVITIES,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`/countries/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            });
		} catch (error) {
			console.log(error);
		}
	};
}

export function postActivity(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				"/activity",
				payload
			);
			window.alert("Activity successfully created");
			return response;
		} catch (error) {
			console.log(error);
			window.alert("Activity already exists");
		}
	};
}

export function filterByActivity(payload) {
	return {
		type: FILTER_BY_ACTIVITY,
		payload,
	};
}

export function filterByRegion(payload) {
	return {
		type: FILTER_BY_REGION,
		payload,
	};
}

export function orderByPopulation(payload) {
	return {
		type: ORDER_BY_POPULATION,
		payload,
	}
};

export function alphabeticalOrder(payload) {
	return {
		type: ALPHABETICAL_ORDER,
		payload,
	};
}

export function cleanDetail() {
	return {
		type: CLEAN_DETAIL,
	};
}

export function deleteActivity(id) {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`/activities?id=${id}`);
			return dispatch({
				type: DELETE_ACTIVITY,
				payload: id
			})
		} catch (error) {
			console.log(error)
		}
	}
};

export function updateActivity(payload) {
	return async function () {
		try {
			const response = await axios.put(
				"/activities", payload
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};



