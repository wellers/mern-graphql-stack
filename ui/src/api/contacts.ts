import * as Actions from "../actions/contacts";
import * as Types from "../types/contacts";
import { GraphQLClient, ContactSearch, Contact } from "@wellers/graphql-client";

const { GRAPHQL_URL } = process.env;

export const fetchContacts = (search: ContactSearch): Actions.ContactAction => async dispatch => {
	dispatch(Actions.requestContacts(search.page_number));

	const client = new GraphQLClient(GRAPHQL_URL as string);
	const response = await client.findContacts(search);

	return response.hasError
		? dispatch(receiveError(response.error))
		: dispatch(Actions.receiveContacts(response.value));
}

export const addContact = (input: Contact): Actions.ContactAction => async dispatch => {
	dispatch(Actions.requestAddContact(input));

	const client = new GraphQLClient(GRAPHQL_URL as string);
	const response = await client.insertContact(input);

	return response.hasError
		? dispatch(receiveError(response.error))
		: dispatch(Actions.receiveAddContact(response.value));
}

export function receiveError(error: Error): Types.ReceiveServerError {
	return {
		type: Types.RECEIVE_SERVER_ERROR,
		error: error
	}
}