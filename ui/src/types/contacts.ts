import { Contact } from "@wellers/graphql-client";
import LoadObject from "../loadObject";

export const REQUEST_CONTACTS = 'REQUEST_CONTACTS';
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export const RECEIVE_SERVER_ERROR = 'RECEIVE_SERVER_ERROR';

export type ContactRecord = {
	readonly title: string;
	readonly forename: string;
	readonly surname: string;
};

// Redux state
export interface ContactsState {
	readonly contacts: LoadObject<ReadonlyArray<ContactRecord>>;
	readonly pageNumber: number;
	readonly totalResultCount: number;
	readonly resultsPerPage: number;
	readonly serverError: string;
}

//redux actions
export interface RequestContacts { type: typeof REQUEST_CONTACTS, pageNumber: number }
export interface ReceiveContacts { type: typeof RECEIVE_CONTACTS, results: ReadonlyArray<Contact>, totalResultsCount: number; resultsPerPage: number }
export interface ReceiveServerError { type: typeof RECEIVE_SERVER_ERROR, error: Error }

export type ContactActions =
	RequestContacts
	| ReceiveContacts
	| ReceiveServerError;