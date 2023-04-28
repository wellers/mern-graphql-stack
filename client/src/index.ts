import { postRequest } from "./requests";

export class GraphQLClient {
	constructor(
		readonly graphUrl: string
	) {}

	async contacts_find(filter: ContactSearch) {
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
		
		return await postRequest(this.graphUrl, payload);
	}
}

export type ContactSearch = {
    search_term: string;
    page_number: number;
	results_per_page: number
}

export type Contact = {
    title: string | undefined;
    forename: string | undefined;
    surname: string | undefined;
}

export type ContactsFindResponse = {
    success: boolean,
    message?: string,
    docs: Contact[],
	total_results_count: number,
	results_per_page: number
}