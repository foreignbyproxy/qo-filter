module.exports = {
	Query: {
		stocks: async (
			_,
			{ offset = 0, limit = 25, orderBy = "symbol", orderDirection = "ASC" },
			{ dataSources }
		) => {
			const allStocks = await dataSources.stockAPI.getAllStocks([orderBy, orderDirection]);

			const currentPage = offset / limit + 1;
			const totalPages = Math.floor(allStocks.length / limit);
			const stocks = allStocks.slice(offset, offset + limit);

			return {
				offset,
				limit,
				currentPage,
				totalPages,
				totalStocks: allStocks.length,
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
		favoriteStock: async (_, { symbol, status }, { dataSources }) => {
			try {
				if(status === undefined || symbol === undefined) {
					throw new Error('Request did not send status and/or symbol.')
				}

				await dataSources.stockAPI.favoriteStock(symbol, status);

				return {
					success: true,
					message: `${symbol} ${status ? 'favorited' : 'unfavorited'}`,
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
