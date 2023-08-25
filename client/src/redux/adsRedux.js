/* SELECTORS */

export const getAllAds = (state) => state.ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

/* ACTIONS */

// action creators
const createActionName = (name) => `app/ads/${name}`;

const LOAD_AD = createActionName('LOAD_AD');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

export const loadAd = (payload) => ({ type: LOAD_AD, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });

/* INITIAL STATE */
const initialState = [];

// Reducer
const adsReducer = (state = initialState, action) => {
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

		default:
			return state;
	}
};
export default adsReducer;
