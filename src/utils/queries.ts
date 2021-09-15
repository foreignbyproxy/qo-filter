import { gql } from "@apollo/client";

export const ALL_STOCKS = gql`
	query Query($offset: Int, $limit: Int, $orderBy: String, $orderDirection: String) {
		stocks(offset: $offset, limit: $limit, orderBy: $orderBy, orderDirection: $orderDirection) {
			offset
			limit
			currentPage
			totalPages
			totalStocks
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
		updateStocks {
			success
			message
		}
	}
`;
