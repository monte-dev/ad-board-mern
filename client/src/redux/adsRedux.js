import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */

export const getAllAds = (state) => state.ads;
export const getNewestAds = (state) =>
	state.ads
		.slice()
		.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

/* ACTIONS */

// action creators
const createActionName = (name) => `app/ads/${name}`;

const LOAD_AD = createActionName('LOAD_AD');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const LOAD_SEARCHED_AD = createActionName('LOAD_SEARCHED_AD');

export const loadAd = (payload) => ({ type: LOAD_AD, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const loadSearchedAd = (payload) => ({
	type: LOAD_SEARCHED_AD,
	payload,
});

export const loadAdRequest = () => {
	return async (dispatch) => {
		try {
			let res = await axios.get(`${API_URL}/ads`);
			dispatch(loadAd(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

export const addAdRequest = (adData) => {
	return async (dispatch) => {
		try {
			const options = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			await axios.post(`${API_URL}/ads`, adData, options);
			dispatch(addAd(adData));
		} catch (err) {
			console.log(err);
		}
	};
};

export const editAdRequest = (adId, updatedData) => {
	return async (dispatch) => {
		try {
			let res = await axios.put(`${API_URL}/ads/${adId}`, updatedData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			dispatch(editAd(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

export const removeAdRequest = (adId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`${API_URL}/ads/${adId}`);
			dispatch(removeAd(adId));
		} catch (err) {
			console.log(err);
		}
	};
};

export const loadSearchedAds = (searchPhrase) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(
				`${API_URL}/ads/search/${searchPhrase}`
			);
			console.log('dataaa', res.data);
			dispatch(loadSearchedAd(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

// Reducer
const adsReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_AD:
			return [...action.payload];

		case ADD_AD:
			return [...state, action.payload];

		case EDIT_AD:
			return state.map((ad) =>
				ad._id === action.payload._id ? action.payload : ad
			);

		case REMOVE_AD:
			return state.filter((ad) => ad._id !== action.payload);
		case LOAD_SEARCHED_AD:
			return [...state, action.payload];
		default:
			return state;
	}
};
export default adsReducer;
