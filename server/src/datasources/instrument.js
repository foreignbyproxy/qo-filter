const { DataSource } = require("apollo-datasource");
const faker = require("faker");
const puppeteer = require("puppeteer");

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
		let stocks = await this.scrapQOData();


		stocks = stocks.map((stock) => {
			return {
				createdAt: faker.datatype.datetime(),
				description: faker.random.words(8),
				exchange: faker.random.alphaNumeric(4),
				ipoDate: faker.date.past().toString(),
				couponRate: faker.datatype.float(1),
				couponAnnualAmount: faker.datatype.number(100),
				parValue: 25,
				callValue: 25,
				callDate: faker.date.future().toString(),
				maturityDate: faker.date.future().toString(),
				moodysRating: "A",
				spRating: "AAA",
				distributionDates: faker.random.words(4),
				...stock
			};
		});

		await this.store.instruments.bulkCreate(stocks, {
			updateOnDuplicate: Object.keys(this.store.instruments.rawAttributes)
		});

		console.log(`Updating/Inserting ${stocks.length} stocks`);
	}

	async scrapQOData() {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.goto("https://www.quantumonline.com/login.cfm");
		await page.$eval('input[name="acctname"]', (el) => (el.value = "ggerard.18"));
		await page.$eval('input[name="pswrd"]', (el) => (el.value = "papag1108"));
		await page.click('input[name="submit"]');
		await page.goto(
			"https://www.quantumonline.com/pfdtable.cfm?Type=AllPfds&SortColumn=symbol&Sortorder=ASC"
		);

		await page.select('select[name="itemsreturned"]', "5000");
		await page.click('input[name="submit"]');

		await page.waitForSelector('table[width="100%"] tbody');

		const stocks = await page.evaluate(() => {
			/*
				Must define functions here because this function gets executed on the
				page context not in our context
			*/
			function getSymbol(row) {
				return row.cells[0].childNodes[0].childNodes[0].innerText;
			}

			const allStocks = [];

			const tableRows = document.querySelectorAll('table[width="100%"] tbody tr');

			tableRows.forEach((tableRow) => {
				//Skip header rows and none stock rows
				if (tableRow.hasAttribute("bgcolor")) return;
				if (tableRow.cells.length != 12) return;

				allStocks.push({
					symbol: getSymbol(tableRow),
				});
			});

			return allStocks;
		});

		await browser.close();

		return stocks;
	}
}

module.exports = InstrumentAPI;
