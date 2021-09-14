import React, { FunctionComponent } from "react";
import classnames from "classnames";

import styles from "./DistributionDates.module.scss";

interface DistributionDates {
	symbol: string;
	dates: string;
}

const monthValues: {
	[k: string]: string;
} = {
	"1": "",
	"2": "",
	"3": "",
	"4": "",
	"5": "",
	"6": "",
	"7": "",
	"8": "",
	"9": "",
	"10": "",
	"11": "",
	"12": "",
};

const monthLabels: {
	[k: string]: string;
} = {
	"1": "Jan",
	"2": "Feb",
	"3": "Mar",
	"4": "Apr",
	"5": "May",
	"6": "Jun",
	"7": "Jul",
	"8": "Aug",
	"9": "Sep",
	"10": "Oct",
	"11": "Nov",
	"12": "Dec",
};

const DistributionDates: FunctionComponent<DistributionDates> = ({ symbol, dates }) => {
	const datesArray = dates.split(",").reduce((carry, item) => {
		let split = item.split("/");

		if (Object.keys(carry).includes(split[0])) {
			carry[split[0]] = item;
		}

		return carry;
	}, {...monthValues});

	return (
		<div className={styles["DistributionDates"]}>
			{Object.keys(datesArray).map((key) => {
				const markerclasses = classnames(styles["marker"], {
					[styles["filled"]]: datesArray[key],
					[styles["empty"]]: !datesArray[key],
				});

				return (
					<span className={markerclasses} key={`${symbol}-${key}`} title={monthLabels[key]}>
						<span className="sr-only">{datesArray[key]}</span>
					</span>
				);
			})}
		</div>
	);
};

export default DistributionDates;
