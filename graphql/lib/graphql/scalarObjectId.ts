import { GraphQLScalarType } from "graphql";
import { ValueNode } from "graphql/language";
import { ObjectId } from "mongodb";

/**
 * Returns an scalar which converts a hex string to an object and back
 * @param {string} name
 */
export function scalarObjectId(name: string){
	return new GraphQLScalarType({
		name,
		description : "Conversion of string to Mongo ObjectId",
		serialize(value: any) {
			return value.toString();
		},
		parseValue(value: any) {
			return new ObjectId(value);
		},
		parseLiteral(ast: ValueNode) {
			if (ast.kind === "StringValue") {
				return new ObjectId(ast.value);
			}
		}
	});
}