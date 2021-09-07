const { gql } = require("apollo-server");

const typeDefs = gql`
	type Query {
		instruments(pageSize: Int, after: String): InstrumentConnection!
	}

	type Mutation {
		updateInstruments: UpdateInstruments!
	}

	type InstrumentConnection {
		cursor: String
		hasMore: Boolean!
		instruments: [Instrument]!
	}

	type UpdateInstruments {
		success: Boolean!
		message: String
	}

	type Instrument {
		callDate: String
		callValue: Float
		couponAnnualAmount: Float
		couponRate: Float
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
		updatedAt: Int!
	}
`;

module.exports = typeDefs;
