import { ThunkAction } from "redux-thunk";
import { ContactsFindResponse, Contact } from "@wellers/graphql-client";
import { AppState } from "../stores";
import * as Types from "../types/contacts";

export function requestContacts(pageNumber: number): Types.RequestContacts {
	return {
		type: Types.REQUEST_CONTACTS,
		pageNumber
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

export function requestAddContact(contact: Contact): Types.RequestAddContact {
	return {
		type: Types.REQUEST_ADD_CONTACT,
		contact
	};
}

export function receiveAddContact(success: boolean): Types.ReceiveAddContact {
	return {
		type: Types.RECEIVE_ADD_CONTACT,
		success
	};
}

export function toggleAddContact(show: boolean): Types.ToggleAddContactModal {
	return {
		type: Types.TOGGLE_ADD_CONTACT_MODAL,
		show
	}
}

export type ContactAction = ThunkAction<Promise<Types.ContactActions>, AppState, undefined, Types.ContactActions>;