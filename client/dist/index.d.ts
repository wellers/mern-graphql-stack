export declare class GraphQLClient {
    readonly graphUrl: string;
    constructor(graphUrl: string);
    findContacts(filter: ContactSearch): Promise<import("./loadObject").default<any>>;
    insertContact(input: Contact): Promise<import("./loadObject").default<any>>;
}
export declare type ContactSearch = {
    search_term: string;
    page_number: number;
    results_per_page: number;
};
export declare type Contact = {
    title: string | undefined;
    forename: string | undefined;
    surname: string | undefined;
};
export declare type ContactsFindResponse = {
    success: boolean;
    message?: string;
    docs: Contact[];
    total_results_count: number;
    results_per_page: number;
};
