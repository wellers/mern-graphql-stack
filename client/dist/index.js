"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClient = void 0;
const requests_1 = require("./requests");
class GraphQLClient {
    graphUrl;
    constructor(graphUrl) {
        this.graphUrl = graphUrl;
    }
    async findContacts(filter) {
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
        return await (0, requests_1.postRequest)(this.graphUrl, payload);
    }
    async insertContact(input) {
        const payload = {
            query: `
			mutation($input: contact_insert_input) {
				contacts {
					contact_insert(input: $input) {
						success,
						message
					}
				}
			}`,
            variables: {
                input
            }
        };
        return await (0, requests_1.postRequest)(this.graphUrl, payload);
    }
}
exports.GraphQLClient = GraphQLClient;
//# sourceMappingURL=index.js.map