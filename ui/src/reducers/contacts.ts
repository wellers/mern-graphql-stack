import { Contact } from "@wellers/graphql-client";
import LoadObject from "../loadObject";
import * as Types from "../types/contacts";

const initialState: Types.ContactsState = {
	contacts: LoadObject.empty<ReadonlyArray<Types.ContactRecord>>(),
	pageNumber: 1,
	totalResultCount: 0,
	resultsPerPage: 0,
	showAddContact: false,
	serverError: ''
};

export function contacts(state = initialState, action: Types.ContactActions): Types.ContactsState {
	switch (action.type) {
		case Types.REQUEST_CONTACTS:
			return {
				...state,
				contacts: state.contacts.loading(),
				pageNumber: action.pageNumber
			};
		case Types.RECEIVE_CONTACTS:
			return {
				...state,
				contacts: state.contacts.withValue(action.results.map(mapContactDtoToType)).done(),
				totalResultCount: action.totalResultsCount,
				resultsPerPage: action.resultsPerPage
			};		
		case Types.RECEIVE_ADD_CONTACT:
			return {
				...state,
				showAddContact: false	
			};
		case Types.TOGGLE_ADD_CONTACT_MODAL:
			return {
				...state,
				showAddContact: action.show
			};
		case Types.RECEIVE_SERVER_ERROR:
			return {
				...state,
				serverError: 'An unexpected error has occured.',
				contacts: state.contacts.done()
			};
		default: return state;
	}
}

function mapContactDtoToType(contact: Contact): Types.ContactRecord {
	return {
		title: (contact.title || ''),
		forename: (contact.forename || ''),
		surname: (contact.surname || '')
	}
}