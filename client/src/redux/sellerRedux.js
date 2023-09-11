import axios from 'axios';
import { API_URL } from '../config';

const createActionName = (name) => `app/seller/${name}`;

const LOAD_SELLER = createActionName('LOAD_SELLER');

export const loadSeller = (sellerData) => ({
	type: LOAD_SELLER,
	payload: sellerData,
});
/* THUNKS */
export const loadSellerRequest = (sellerId) => {
	return async (dispatch) => {
		try {
			let res = await axios.get(`${API_URL}/auth/user/${sellerId}`);
			dispatch(loadSeller(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

const sellerReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_SELLER:
			return action.payload;

		default:
			return state;
	}
};
export default sellerReducer;
