import { Contact } from "@wellers/graphql-client";
import LoadObject from "../loadObject";
import { ContactActions, ContactRecord, ContactsState, RECEIVE_CONTACTS, RECEIVE_SERVER_ERROR, REQUEST_CONTACTS } from "../types/contacts";

const initialState: ContactsState = {
	contacts: LoadObject.empty<ReadonlyArray<ContactRecord>>(),
	pageNumber: 1,
	totalResultCount: 0,
	resultsPerPage: 0,
	serverError: ''
};

export function contacts(state = initialState, action: ContactActions): ContactsState {
	switch (action.type) {
	case REQUEST_CONTACTS:
		return {
			...state,
			contacts: state.contacts.loading(),
			pageNumber: action.pageNumber
		};
	case RECEIVE_CONTACTS:
		return {
			...state,
			contacts: state.contacts.withValue(action.results.map(mapContactDtoToType)).done(),
			totalResultCount: action.totalResultsCount,
			resultsPerPage: action.resultsPerPage
		};
	case RECEIVE_SERVER_ERROR:
		return {
			...state,
			serverError: 'An unexpected error has occured.',
			contacts: state.contacts.done()
		};
	default: return state;
	}
}

function mapContactDtoToType(contact: Contact): ContactRecord {
	return {
		title: (contact.title || ''),
		forename: (contact.forename || ''),
		surname: (contact.surname || '')
	}
}