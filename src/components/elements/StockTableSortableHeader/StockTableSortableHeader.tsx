import classNames from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./StockTableSortableHeader.module.scss";
import type { StockQueryParama } from "../../../utils/types";

interface StockTableSortableHeaderProps {
	children: string;
	slug: string;
	queryParameters: StockQueryParama;
	updateQuery: (payload: Partial<StockQueryParama>) => void;
}

const StockTableSortableHeader: FunctionComponent<StockTableSortableHeaderProps> = ({
	children,
	slug,
	queryParameters,
	updateQuery,
}) => {
	const isActive = slug === queryParameters.orderBy;

	function activate() {
		let orderDirection = "ASC";
		if (isActive && queryParameters.orderDirection === "ASC") {
			orderDirection = "DESC";
		}

		updateQuery({
			orderBy: slug,
			orderDirection,
		});
	}

	const buttonClasses = classNames(styles["StockTableSortableHeader"], {
		[styles["active"]]: isActive,
		[styles["active--asc"]]: isActive && queryParameters.orderDirection === "ASC",
		[styles["active--desc"]]: isActive && queryParameters.orderDirection === "DESC",
	});

	return (
		<button className={buttonClasses} onClick={activate}>
			{children}
			<span className={styles["indicators"]}></span>
		</button>
	);
};

export default StockTableSortableHeader;
