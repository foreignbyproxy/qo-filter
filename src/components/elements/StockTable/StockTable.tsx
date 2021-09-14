import React, { FunctionComponent } from "react";

import type { Stock, StockQueryParama } from "../../../utils/types";
import styles from "./StockTable.module.scss";

import DistributionDates from "../DistributionDates/DistributionDates";
import StockTableSortableHeader from "../StockTableSortableHeader/StockTableSortableHeader";

interface StockTableProps {
	stocks: Stock[];
	queryParameters: StockQueryParama;
	updateQuery: (payload: Partial<StockQueryParama>) => void;
}

const StockTable: FunctionComponent<StockTableProps> = ({
	stocks,
	queryParameters,
	updateQuery,
}) => {
	return (
		<table className={styles["StockTable"]}>
			<thead>
				<tr>
					<td>
						<StockTableSortableHeader
							slug="symbol"
							updateQuery={updateQuery}
							queryParameters={queryParameters}
						>
							Symbol
						</StockTableSortableHeader>
					</td>
					<td>Description</td>
					<td>Exchange</td>

					<td>
						<StockTableSortableHeader
							slug="couponRate"
							updateQuery={updateQuery}
							queryParameters={queryParameters}
						>
							Coupon
						</StockTableSortableHeader>
					</td>
					<td>Par (Call Date)</td>
					<td>Rating</td>
					<td>
						<StockTableSortableHeader
							slug="ipoDate"
							updateQuery={updateQuery}
							queryParameters={queryParameters}
						>
							IPO Date
						</StockTableSortableHeader>
					</td>
					<td>Distrubtion Dates</td>
				</tr>
			</thead>
			<tbody>
				{stocks.map((item) => {
					return (
						<tr key={item.symbol}>
							<td>{item.symbol}</td>
							<td>{item.description}</td>
							<td>{item.exchange}</td>
							<td>
								<span className={styles["couponRate"]}>
									{(item.couponRate * 100).toFixed(2)}%
								</span>
								<span className={styles["secondaryInfo"]}>
									(${item.couponAnnualAmount.toFixed(2)})
								</span>
							</td>
							<td>
								<span className={styles["couponRate"]}>
									${item.parValue.toFixed(2)}
								</span>
								<span className={styles["secondaryInfo"]}>({item.callDate})</span>
							</td>
							<td>
								<p>
									{item.moodysRating} / {item.spRating}
								</p>
								<p>{item.ratingsDate}</p>
							</td>
							<td>{item.ipoDate}</td>
							<td>
								{item.distributionDates && (
									<DistributionDates
										symbol={item.symbol}
										dates={item.distributionDates}
									/>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default StockTable;
