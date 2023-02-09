import { combineReducers } from "redux";
import { contacts } from "../reducers/contacts";

export const rootReducer = combineReducers({
	contacts
});

export type AppState = ReturnType<typeof rootReducer>;