import * as Actions from "../actions/contacts";
import * as Types from "../types/contacts";
import { GraphQLClient, ContactSearch } from "@wellers/graphql-client";

const { GRAPHQL_URL } = process.env;

export const fetchContacts = (search: ContactSearch): Actions.ContactAction => async dispatch => {
	dispatch(Actions.requestContacts(search.page_number));

	const client = new GraphQLClient(GRAPHQL_URL as string);
	const response = await client.contacts_find(search);

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