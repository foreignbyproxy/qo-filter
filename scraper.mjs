import puppeteer from "puppeteer";
import FormData from "form-data";

(async () => {
	let cookies;
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto("https://www.quantumonline.com/login.cfm");
	console.log(page.url());

	await page.$eval('input[name="acctname"]', (el) => (el.value = "ggerard.18"));
	await page.$eval('input[name="pswrd"]', (el) => (el.value = "papag1108"));
	await page.click('input[name="submit"]');

	console.log(page.url());

	await page.goto(
		"https://www.quantumonline.com/pfdtable.cfm?Type=AllPfds&SortColumn=symbol&Sortorder=ASC"
	);

	await page.select('select[name="itemsreturned"]', "5000");
	await page.click('input[name="submit"]');

	await page.waitForSelector('table[width="100%"] tbody');

	const stocks = await page.evaluate((symbol) => {
		const allStocks = [];

		const tableRows = document.querySelectorAll('table[width="100%"] tbody tr');

		tableRows.forEach((tableRow, key) => {
			//Skip header rows and none stock rows
			if (tableRow.hasAttribute("bgcolor")) return;
			if (tableRow.cells.length != 12) return;

			allStocks.push({
				symbol: symbol(tableRow),
			});
		});

		return allStocks;
	}, getSymbol);

	debugger;

	await browser.close();

	console.log("Done");
})();

function getSymbol(row) {
	return row.cells[0].childNodes[0].childNodes[0].innerText;
}
