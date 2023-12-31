/* SELECTORS */

export const getCurrentUser = (state) => state.user;

/* ACTIONS */
// action creators
const createActionName = (name) => `app/users/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = (payload) => ({ type: LOG_IN, payload });

export const logOut = () => ({
	type: LOG_OUT,
	payload: null,
});

const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOG_IN:
			return action.payload;
		case LOG_OUT:
			return null;

		default:
			return state;
	}
};

export default userReducer;
