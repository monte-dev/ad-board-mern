import { API_URL } from '../config';

/* SELECTORS */

export const getCurrentUser = (state) => state.users;

/* ACTIONS */

// action creators
const createActionName = (name) => `app/users/${name}`;

const LOG_IN = createActionName('LOAD_AD');
const LOG_OUT = createActionName('ADD_AD');

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = (payload) => ({ type: LOG_OUT, payload });

// Reducer
const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOG_IN:
			return [...action.payload];

		case LOG_OUT:
			return [...state, action.payload];

		default:
			return state;
	}
};
export default userReducer;
