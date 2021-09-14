require("dotenv").config();

const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const stockAPI = require("./datasources/stockAPI");

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
	stockAPI: new stockAPI({ store }),
});

// Set up Apollo Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	introspection: true,
	apollo: {
		key: process.env.APOLLO_KEY,
	},
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
	server.listen().then(() => {
		console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
	});
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
	dataSources,
	typeDefs,
	resolvers,
	ApolloServer,
	stockAPI,
	store,
	server,
};
