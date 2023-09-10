import axios from 'axios';
import { API_URL } from '../config';
/* SELECTORS */

export const getCurrentUser = (state) => state.user;

/* ACTIONS */
// action creators
const createActionName = (name) => `app/users/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const LOAD_SELLER = createActionName('LOAD_SELLER');

export const loadSeller = (sellerData) => ({
	type: LOAD_SELLER,
	payload: sellerData,
});
export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = (payload) => ({ type: LOG_OUT, payload });

export const loadSellerRequest = (sellerId) => {
	return async (dispatch) => {
		try {
			let res = await axios.get(`${API_URL}/auth/user/${sellerId}`);
			console.log(res);
			dispatch(loadSeller(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

// Reducer
const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOAD_SELLER:
			return { ...state, sellerData: action.payload };
		case LOG_IN:
			return action.payload;

		case LOG_OUT:
			return null;

		default:
			return state;
	}
};
export default userReducer;
