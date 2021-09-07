const puppeteer = require("puppeteer");

async function scrapQOData() {
	const browser = await puppeteer.launch({
		// headless: false
	});
	const page = await browser.newPage();

	await page.goto("https://www.quantumonline.com/login.cfm");
	await page.$eval('input[name="acctname"]', (el) => (el.value = "ggerard.18"));
	await page.$eval('input[name="pswrd"]', (el) => (el.value = "papag1108"));
	await page.click('input[name="submit"]');
	await page.goto(
		"https://www.quantumonline.com/pfdtable.cfm?Type=AllPfds&SortColumn=symbol&Sortorder=ASC"
	);

	await page.waitForSelector('select[name="itemsreturned"]');
	await page.select('select[name="itemsreturned"]', "5000");
	await page.click('input[name="submit"]');

	await page.waitForSelector('table[width="100%"] tbody');

	const stocks = await page.evaluate(() => {
		/*
			Must define functions here because this function gets executed on the
			page context not in our context
		*/
		function formatText(value) {
			return value.replace(/(\n|\t)/gm, "").trim()
		}

		function formatStockData(row) {
			return {
				callDate: formatText(row.cells[6].childNodes[0].textContent),
				callValue: formatText(row.cells[5].childNodes[2].textContent),
				couponAnnualAmount: formatText(row.cells[4].childNodes[2].textContent),
				couponRate: formatText(row.cells[4].childNodes[0].textContent),
				description: row.cells[1].childNodes[0].innerText,
				distributionDates: row.cells[11].childNodes[1].innerText,
				exchange: row.cells[2].childNodes[1].childNodes[3].innerText,
				ipoDate: formatText(row.cells[3].innerText),
				maturityDate: formatText(row.cells[6].childNodes[2].textContent),
				moodysRating: row.cells[7].childNodes[1].innerText,
				parValue: formatText(row.cells[5].childNodes[0].textContent),
				ratingsDate: row.cells[7].childNodes[7].innerText,
				spRating: row.cells[7].childNodes[3].innerText,
				symbol: row.cells[0].childNodes[0].childNodes[0].innerText,
			};
		}

		const allStocks = [];

		const tableRows = document.querySelectorAll('table[width="100%"] tbody tr');

		tableRows.forEach((tableRow) => {
			//Skip header rows and none stock rows
			if (tableRow.hasAttribute("bgcolor")) return;
			if (tableRow.cells.length != 12) return;

			let data = formatStockData(tableRow);

			allStocks.push(data);
		});

		return allStocks;
	});

	// await browser.close();

	return stocks;
}

module.exports.scrapQOData = scrapQOData;
