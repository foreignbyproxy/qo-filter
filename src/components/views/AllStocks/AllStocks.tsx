import React, { useReducer, Fragment } from "react";
import { useQuery } from "@apollo/client";

import styles from "./AllStocks.module.scss";
import StockTable from "../../elements/StockTable/StockTable";
import StockTablePagination from "../../elements/StockTablePagination/StockTablePagination";
import { ALL_STOCKS } from "../../../utils/queries";
import type { StockQueryParameters, AllStockResponse } from "../../../utils/types";

interface ActionState {
	type: "UPDATE";
	payload: Partial<StockQueryParameters>;
}

const reducerInitialState: StockQueryParameters = {
	offset: 0,
	limit: 25,
	orderBy: "symbol",
	orderDirection: "ASC",
};

function reducer(state: StockQueryParameters, action: ActionState) {
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


	const { loading, error, data } = useQuery<AllStockResponse>(ALL_STOCKS, {
		variables: queryParameters,
	});

	function updateQuery(payload: Partial<StockQueryParameters>) {
		dispatch({
			type: "UPDATE",
			payload,
		});
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className={styles["AllStocks"]}>
			{data && (
				<Fragment>
					<div className={styles["header"]}>
						<StockTablePagination queryData={data.stocks} updateQuery={updateQuery} />
					</div>

					<StockTable
						stocks={data.stocks.stocks}
						queryParameters={queryParameters}
						updateQuery={updateQuery}
					/>
				</Fragment>
			)}
		</div>
	);
}

export default AllStocks;
