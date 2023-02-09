import { ThunkAction } from "redux-thunk";
import { ContactsFindResponse } from "../api/graphql-client/types";
import { AppState } from "../stores";
import * as Types from "../types/contacts";

export function requestContacts(pageNumber: number): Types.RequestContacts {
	return {
		type: Types.REQUEST_CONTACTS,
		pageNumber: pageNumber
	};
}

export function receiveContacts(response: any): Types.ReceiveContacts {
	const { docs, total_results_count, results_per_page } = response.contacts.contacts_find as ContactsFindResponse;
	return {
		type: Types.RECEIVE_CONTACTS,
		results: docs,
		totalResultsCount: total_results_count,
		resultsPerPage: results_per_page
	};
}

export type ContactAction = ThunkAction<Promise<Types.ContactActions>, AppState, undefined, Types.ContactActions>;