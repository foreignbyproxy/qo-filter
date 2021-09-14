import React from "react";
import styles from "./App.module.scss";

import ButtonUpdateDatabase from "../../elements/ButtonUpdateDatabase/ButtonUpdateDatabase";
import AllStocks from "../../views/AllStocks/AllStocks";

function App() {
	return (
		<div className={styles["App"]}>
			<div className={styles["navigation"]}>
				<div className={styles["links"]}>
					<a href="#all-stocks">All Stocks</a>
					<a href="#watched">Watched</a>
				</div>
				<div className={styles["actions"]}>
					<ButtonUpdateDatabase />
				</div>
			</div>
			<div className={styles["main"]}>
				<div className={styles["wrapper"]}>
					<AllStocks />
				</div>
			</div>
		</div>
	);
}

export default App;
