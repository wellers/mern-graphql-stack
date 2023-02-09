import * as Actions from "../actions/contacts";
import * as Types from "../types/contacts";
import { ContactsFind } from "./graphql-client";
import { ContactSearch } from "./graphql-client/types";

export const fetchContacts = (search: ContactSearch): Actions.ContactAction => async dispatch => {
	dispatch(Actions.requestContacts(search.page_number));

	const response = await ContactsFind(search);

	return response.hasError
		? dispatch(receiveError(response.error))
		: dispatch(Actions.receiveContacts(response.value));
}

export function receiveError(error: Error): Types.ReceiveServerError {
	return {
		type: Types.RECEIVE_SERVER_ERROR,
		error: error
	}
}