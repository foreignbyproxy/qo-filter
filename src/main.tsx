import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/wrappers/Root/Root";
import "./assets/global.scss";

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
