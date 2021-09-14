import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import classnames from 'classnames'
import BaseIcon from "@material-ui/icons/Autorenew";

import styles from "./ButtonUpdateDatabase.module.scss";
import { UPDATE_DATABASE } from "../../../utils/queries";

function ButtonUpdateDatabase() {
	const [updateDatabase, { data, loading, error }] = useMutation(UPDATE_DATABASE);

	const buttonClasses = classnames(styles['ButtonUpdateDatabase'], {
		[styles['loading']]: loading,
		[styles['error']]: error
	})

	return (
		<button className={buttonClasses} onClick={() => updateDatabase()} disabled={loading}>
			<BaseIcon />
			Update
		</button>
	);
}

export default ButtonUpdateDatabase;
