import React from "react";
import styles from "./Root.module.scss";

import App from "../App/App";

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});

function Root() {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
}

export default Root;
