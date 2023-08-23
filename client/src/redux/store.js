import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import adsReducer from './adsReducer';

const store = configureStore({
	reducer: adsReducer,
	middleware: [thunk],
});

export default store;
