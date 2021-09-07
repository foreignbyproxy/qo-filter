import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { gql, useQuery } from "@apollo/client";

export const GET_INSTRUMENTS = gql`
	query GetInstruments($after: String) {
		launches(after: $after) {
			cursor
			hasMore
			launches {
				...LaunchTile
			}
		}
	}
`;

function App() {
	const [count, setCount] = useState(0);

	return <div className="App"></div>;
}

export default App;
