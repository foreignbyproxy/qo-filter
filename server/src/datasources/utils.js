const puppeteer = require("puppeteer");

async function scrapQOData() {
	const browser = await puppeteer.launch({
		// headless: false,
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

	page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

	await Promise.all([
		page.click('input[name="submit"]'),
		page.waitForNavigation({
			timeout: 60000,
			waitUntil: "domcontentloaded",
		}),
	]);

	const stocks = await page.evaluate(() => {
		console.log(`Evaluating Page`);

		/*
			Must define functions here because this function gets executed on the
			page context not in our context
		*/
		function removeTN(value) {
			return value.replace(/(\n|\t)/gm, "").trim();
		}

		function getExchange(cell) {
			if (cell.childNodes[1].children.length === 0) {
				return removeTN(cell.childNodes[1].textContent);
			} else {
				return removeTN(cell.childNodes[1].childNodes[3].textContent);
			}
		}

		function getRatingsData(ratingTextContent) {
			if (!ratingTextContent) {
				return ["-", "-", "-"];
			}

			return ratingTextContent.split(/\n|\s/).filter((value) => value);
		}

		function getCouponRate(textValue) {
			let rate = removeTN(textValue);

			if (rate.includes("%")) {
				let rateNumber = parseFloat(rate) / 100;
				if (Object.is(rateNumber, NaN)) {
					rateNumber = 0;
				}

				return rateNumber;
			} else {
				return 0;
			}
		}

		function getCouponType(textValue) {
			let rate = removeTN(textValue);

			if (rate.includes("%")) {
				return "Fixed";
			} else {
				return rate;
			}
		}

		function formatDollarAmounts(textValue) {
			let dollars = removeTN(textValue);

			if (dollars.includes("$")) {
				let floatValue = parseFloat(dollars.replace("$", ""));
				if (Object.is(floatValue, NaN)) {
					return 0;
				}

				return floatValue;

			} else {
				return 0;
			}
		}

		//Get the cell with the distribution dates a
		function getDistributionDates(textContent) {
			//Get the line of text that has the dates
			let [dates] = textContent.split('\n').filter((value) => {
				return value.split(/,|&/).length > 1
			});

			if(!dates) return null;

			//Splits the list of distribution dates by the
			let filteredDates = dates.split(/,|&/).reduce((carry, value) => {
				let split = value.split('/');

				if(split[0] >= 1 && split[0] <= 12) {
					carry.push(value.trim())
				}

				return carry;
			}, [])

			return filteredDates.join(',');
		}

		function formatStockData(row) {
			console.log(`${row.cells[0].childNodes[0].childNodes[0].innerText}`);
			let ratingsTextSplit = getRatingsData(row.cells[7].innerText);

			return {
				callDate: removeTN(row.cells[6].childNodes[0].textContent),
				callValue: formatDollarAmounts(row.cells[5].childNodes[2].textContent),
				couponAnnualAmount: formatDollarAmounts(row.cells[4].childNodes[2].textContent),
				couponRate: getCouponRate(row.cells[4].childNodes[0].textContent),
				couponType: getCouponType(row.cells[4].childNodes[0].textContent),
				description: row.cells[1].childNodes[0].innerText,
				distributionDates: getDistributionDates(row.cells[11].childNodes[1].innerText),
				exchange: getExchange(row.cells[2]),
				ipoDate: removeTN(row.cells[3].innerText),
				maturityDate: removeTN(row.cells[6].childNodes[2].textContent),
				moodysRating: ratingsTextSplit[0],
				parValue: formatDollarAmounts(row.cells[5].childNodes[0].textContent),
				ratingsDate: ratingsTextSplit[3],
				spRating: ratingsTextSplit[1],
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

	await browser.close();

	return stocks;
}

module.exports.scrapQOData = scrapQOData;
