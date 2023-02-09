import { postRequest } from "./requests";
import { ContactSearch } from "./types";

const { GRAPHQL_URL } = process.env;

export const ContactsFind = async (filter: ContactSearch) => {
	const payload = {
		query: `
		query($filter: contacts_find_filter) {
			contacts {
				contacts_find(filter: $filter) {
					success,
					message,
					docs {
						title,
						forename,
						surname
					},
					total_results_count,
					results_per_page
				}
			}
		}`,
		variables: {
			filter
		}
	};
	
	return await postRequest(GRAPHQL_URL as string, payload);
}