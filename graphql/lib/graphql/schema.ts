import { gql } from "apollo-server-express";
import { mapKeyResolver } from "./mapKeyResolver";
import { scalarObjectId } from "./scalarObjectId";

export const typeDefs = gql`
	type Query	

	extend type Query {
		contacts: contacts_query
	}	

	type contacts_query

	scalar contact_id
	
	type contact {
		id: contact_id!,
		title: String!,
		forename: String!,
		surname: String!
	}

	input contacts_find_filter {
		search_term: String!,
		page_number: Int!,
		results_per_page: Int!
	}

	type contacts_find_result {
		success: Boolean!,
		message: String!,
		docs: [contact!]!,
		total_results_count: Int!,
		results_per_page: Int!
	}    

	extend type contacts_query {
		contacts_find(filter: contacts_find_filter): contacts_find_result
	}	
`;

export const resolvers = {
	Query: {
		contacts: () => { return {}; }
	},
	contacts_query: {
		async contacts_find(parent, { filter }, { db }, info) {
			const { search_term, page_number, results_per_page } = filter;

			const total_results_count = await db.contacts.count();

			const query = search_term.length > 0
				? { $or: [{ "forename": { $regex: search_term, $options: "i" } }, { "surname": { $regex: search_term, $options: "i" } }] }
				: {}

			const docs = await db.contacts.find(query).toArray();

			const start = (page_number - 1) * results_per_page;

			return {
				success: true,
				message: 'Records matching filter.',
				docs: docs.slice(start, results_per_page),
				total_results_count,
				results_per_page
			};
		}
	},
	contact: {
		id: mapKeyResolver("_id")
	},
	contact_id: scalarObjectId("contact_id")
}