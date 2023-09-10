import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adsRedux from './adsRedux';
import userRedux from './userRedux';
import initialState from './initialState';
import sellerRedux from './sellerRedux';
const subreducers = {
	ads: adsRedux,
	user: userRedux,
	seller: sellerRedux,
};
const rootReducer = combineReducers(subreducers);
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
);

export default store;
