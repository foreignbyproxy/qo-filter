const { gql } = require("apollo-server");
const { TimestampTypeDefinition } = require("graphql-scalars");

const typeDefs = [
	TimestampTypeDefinition,
	gql`
		type Query {
			stocks(
				offset: Int
				limit: Int
				orderBy: String
				orderDirection: String
			): StockConnection!
		}

		type Mutation {
			updateStocks: genericMutationResponse!
			favoriteStock(status: Boolean, symbol: String): genericMutationResponse!
		}

		type StockConnection {
			offset: Int!
			limit: Int!
			currentPage: Int!
			totalPages: Int!
			totalStocks: Int!
			stocks: [Stock]!
		}

		type genericMutationResponse {
			success: Boolean!
			message: String
		}

		type Stock {
			callDate: String
			callValue: Float
			couponAnnualAmount: Float
			couponRate: Float
			couponType: String
			description: String!
			distributionDates: String
			exchange: String
			ipoDate: String
			maturityDate: String
			moodysRating: String
			parValue: Float
			ratingsDate: String
			spRating: String
			symbol: String!
			updatedAt: Timestamp!
			favorite: Boolean!
		}
	`,
];

module.exports = typeDefs;
