module.exports = {
	Query: {
		stocks: async (_, { offset = 0, limit = 20 }, { dataSources }) => {
			const allStocks = await dataSources.stockAPI.getAllStocks();

			const currentPage = offset / limit + 1;
			const totalPages = Math.floor(allStocks.length / limit);
			const stocks = allStocks.slice(offset, offset + limit);

			return {
				offset,
				limit,
				currentPage,
				totalPages,
				stocks,
			};
		},
	},
	Mutation: {
		updateStocks: async (_, __, { dataSources }) => {
			try {
				const numberOfUpdates = await dataSources.stockAPI.updateFromQO();

				return {
					success: true,
					message: `Updating/Inserting ${numberOfUpdates} stocks`,
				};
			} catch (error) {
				return {
					success: false,
					message: error.message,
				};
			}
		},
	},
};
