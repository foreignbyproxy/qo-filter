import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import classnames from "classnames";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

import styles from "./ButtonFavoriteStock.module.scss";
import { FAVORITE_STOCK } from "../../../utils/queries";

interface ButtonFavoriteStockProps {
	active: boolean;
	symbol: string;
}

function ButtonFavoriteStock({ active, symbol }: ButtonFavoriteStockProps) {
	const [favorited, setFavorited] = useState(active);
	const [favoriteStock, { data, loading, error }] = useMutation(FAVORITE_STOCK);

	const buttonClasses = classnames(styles["ButtonFavoriteStock"], {
		[styles["active"]]: active,
	});

	function updateFavorite() {
		let newStatus = !favorited;

		favoriteStock({
			variables: {
				symbol: symbol,
				status: newStatus
			},
		}).then(() => {
			setFavorited(newStatus)
		})
	}

	return (
		<button
			className={buttonClasses}
			onClick={updateFavorite}
		>
			{ favorited ? <StarIcon /> : <StarBorderIcon />}
			<span className="sr-only">Stock is favorited</span>
		</button>
	);
}

export default ButtonFavoriteStock;
