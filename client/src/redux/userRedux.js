/* SELECTORS */

export const getCurrentUser = (state) => state.user;

/* ACTIONS */

// action creators
const createActionName = (name) => `app/users/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = (payload) => ({ type: LOG_OUT, payload });

// Reducer
const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOG_IN:
			return action.payload

		case LOG_OUT:
			return [...state, action.payload];

		default:
			return state;
	}
};
export default userReducer;
