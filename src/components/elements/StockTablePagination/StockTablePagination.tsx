import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./StockTablePagination.module.scss";
import type { AllStockQuery, StockQueryParameters } from "../../../utils/types";

interface StockTablePaginationProps {
	queryData: AllStockQuery;
	updateQuery: (payload: Partial<StockQueryParameters>) => void;
}

const StockTablePagination: FunctionComponent<StockTablePaginationProps> = ({
	queryData,
	updateQuery,
}) => {
	function onFieldUpdate(name: string, value: string) {
		let newValue: string | number = value;
		if (name === "limit") {
			newValue = Number(value);
		}

		updateQuery({
			[name]: newValue,
		});
	}

	return (
		<div className={styles["StockTablePagination"]}>
			<div className={styles["info"]}>
				<span>
					Page {queryData.currentPage} of {queryData.totalPages}
				</span>
				<span>Total Stocks: {queryData.totalStocks}</span>
			</div>
			<div className={styles["limit"]}>
				<span>Stocks Per Page</span>
				<select
					name="limit"
					value={queryData.limit}
					onChange={(evt) =>
						onFieldUpdate(evt.currentTarget.name, evt.currentTarget.value)
					}
				>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
		</div>
	);
};

export default StockTablePagination;
