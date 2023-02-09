import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { AppState, rootReducer } from "./stores";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState?: AppState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);
}