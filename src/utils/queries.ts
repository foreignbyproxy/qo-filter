import { gql } from "@apollo/client";

export const ALL_STOCKS = gql`
	query Query($stocksOffset: Int, $stocksLimit: Int) {
		stocks(offset: $stocksOffset, limit: $stocksLimit) {
			offset
			limit
			currentPage
			totalPages
			stocks {
				callDate
				callValue
				couponAnnualAmount
				couponRate
				couponType
				description
				distributionDates
				exchange
				ipoDate
				maturityDate
				moodysRating
				parValue
				ratingsDate
				spRating
				symbol
				updatedAt
			}
		}
	}
`;

export const UPDATE_DATABASE = gql`
	mutation Mutation {
		updateInstruments {
			success
			message
		}
	}
`;
