
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