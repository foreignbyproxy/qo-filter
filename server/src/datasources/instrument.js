const { DataSource } = require("apollo-datasource");
const { scrapQOData } = require("./utils");
const faker = require("faker");

class InstrumentAPI extends DataSource {
	constructor({ store }) {
		super();
		this.store = store;
	}

	/**
	 * This is a function that gets called by ApolloServer when being setup.
	 * This function gets called with the datasource config including things
	 * like caches and context. We'll assign this.context to the request context
	 * here, so we can know about the user making requests
	 */
	initialize(config) {
		this.context = config.context;
	}

	async getAllInstruments() {
		return await this.store.instruments.findAll();
	}

	async updateFromQO() {
		let stocks = await scrapQOData();

		stocks = stocks.map((stock) => {
			return {
				updatedAt: Date.now(),
				...stock
			};
		});

		await this.store.instruments.bulkCreate(stocks, {
			updateOnDuplicate: Object.keys(this.store.instruments.rawAttributes)
		});

		return stocks.length;
	}
}

module.exports = InstrumentAPI;
