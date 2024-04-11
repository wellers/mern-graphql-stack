import { Contact } from "@wellers/graphql-client";
import LoadObject from "../loadObject";

export const REQUEST_CONTACTS = "REQUEST_CONTACTS";
export const RECEIVE_CONTACTS = "RECEIVE_CONTACTS";
export const REQUEST_ADD_CONTACT = "REQUEST_ADD_CONTACT";
export const RECEIVE_ADD_CONTACT = "RECEIVE_ADD_CONTACT";
export const TOGGLE_ADD_CONTACT_MODAL = "SHOW_ADD_CONTACT";
export const RECEIVE_SERVER_ERROR = "RECEIVE_SERVER_ERROR";

export type ContactRecord = {
	readonly title: string;
	readonly forename: string;
	readonly surname: string;
};

// redux state
export interface ContactsState {
	readonly contacts: LoadObject<ReadonlyArray<ContactRecord>>;
	readonly pageNumber: number;
	readonly totalResultCount: number;
	readonly resultsPerPage: number;
	readonly showAddContact: boolean;
	readonly serverError: string;
}

// redux actions
export interface RequestContacts {
	type: typeof REQUEST_CONTACTS,
	pageNumber: number
}
export interface ReceiveContacts {
	type: typeof RECEIVE_CONTACTS,
	results: ReadonlyArray<Contact>,
	totalResultsCount: number;
	resultsPerPage: number
}

export interface RequestAddContact {
	type: typeof REQUEST_ADD_CONTACT,
	contact: Contact
}

export interface ReceiveAddContact {
	type: typeof RECEIVE_ADD_CONTACT,
	success: boolean
}

export interface ToggleAddContactModal {
	type: typeof TOGGLE_ADD_CONTACT_MODAL,
	show: boolean
}

export interface ReceiveServerError {
	type: typeof RECEIVE_SERVER_ERROR,
	error: Error
}

export type ContactActions =
	RequestContacts
	| ReceiveContacts
	| RequestAddContact
	| ReceiveAddContact
	| ToggleAddContactModal
	| ReceiveServerError;