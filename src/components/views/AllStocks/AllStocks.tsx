import React, { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";

import StockTable from "../../elements/StockTable/StockTable";
import { ALL_STOCKS } from "../../../utils/queries";

interface AllStocksProps {}

const AllStocks: FunctionComponent<AllStocksProps> = () => {
	const { loading, error, data } = useQuery(ALL_STOCKS, {
		variables: {
			stocksOffset: 0,
			stocksLimit: 10,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return <StockTable stocks={data.stocks.stocks} />;
};

export default AllStocks;
