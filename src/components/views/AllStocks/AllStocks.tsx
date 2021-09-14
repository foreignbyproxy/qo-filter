import React, { useReducer } from "react";
import { useQuery } from "@apollo/client";

import StockTable from "../../elements/StockTable/StockTable";
import { ALL_STOCKS } from "../../../utils/queries";
import type { StockQueryParama } from "../../../utils/types";


interface ActionState {
	type: "UPDATE";
	payload: Partial<StockQueryParama>;
}

const reducerInitialState: StockQueryParama = {
	offset: 0,
	limit: 10,
	orderBy: "symbol",
	orderDirection: "ASC",
};

function reducer(state: StockQueryParama, action: ActionState) {
	switch (action.type) {
		case "UPDATE":
			return {
				...state,
				...action.payload,
			};
		default:
			throw new Error();
	}
}

function AllStocks() {
	const [queryParameters, dispatch] = useReducer(reducer, reducerInitialState);
	console.log(queryParameters);

	const { loading, error, data } = useQuery(ALL_STOCKS, {
		variables: queryParameters,
	});

	function updateQuery(payload: Partial<StockQueryParama>) {
		dispatch({
			type: "UPDATE",
			payload,
		});
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<StockTable
			stocks={data.stocks.stocks}
			queryParameters={queryParameters}
			updateQuery={updateQuery}
		/>
	);
}

export default AllStocks;
