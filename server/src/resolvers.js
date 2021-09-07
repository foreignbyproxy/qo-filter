const { paginateResults } = require("./utils");

module.exports = {
	Query: {
		instruments: async (_, { pageSize = 20, after }, { dataSources }) => {
			const allInstruments = await dataSources.InstrumentAPI.getAllInstruments();

			const instruments = paginateResults({
				after,
				pageSize,
				results: allInstruments,
			});

			return {
				instruments,
				cursor: instruments.length ? instruments[instruments.length - 1].cursor : null,
				// if the cursor of the end of the paginated results is the same as the
				// last item in _all_ results, then there are no more results after this
				hasMore: instruments.length
					? instruments[instruments.length - 1].cursor !==
					  allInstruments[allInstruments.length - 1].cursor
					: false,
			};
		},
	},
	Mutation: {
		updateInstruments: async (_, __, { dataSources }) => {
			await dataSources.InstrumentAPI.updateFromQO();

			return {
				success: true,
				message: "All data updated.",
			};
		},
	},
};
