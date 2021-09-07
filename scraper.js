const { scrapQOData } = require("./server/src/datasources/utils.js");

(async () => {
	const stocks = await scrapQOData();

	debugger;
})();
