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
		symbol: String!
		description: String!
		exchange: String
		ipoDate: String
		couponRate: Float
		couponAnnualAmount: Float
		parValue: Float
		callValue: Float
		callDate: String
		maturityDate: String
		moodysRating: String
		spRating: String
		distributionDates: String
	}
`;

module.exports = typeDefs;
