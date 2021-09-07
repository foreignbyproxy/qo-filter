const { Sequelize, DataTypes } = require("sequelize");

module.exports.paginateResults = ({
	after: cursor,
	pageSize = 20,
	results,
	// can pass in a function to calculate an item's cursor
	getCursor = () => null,
}) => {
	if (pageSize < 1) return [];

	if (!cursor) return results.slice(0, pageSize);
	const cursorIndex = results.findIndex((item) => {
		// if an item has a `cursor` on it, use that, otherwise try to generate one
		let itemCursor = item.cursor ? item.cursor : getCursor(item);

		// if there's still not a cursor, return false by default
		return itemCursor ? cursor === itemCursor : false;
	});

	return cursorIndex >= 0
		? cursorIndex === results.length - 1 // don't let us overflow
			? []
			: results.slice(cursorIndex + 1, Math.min(results.length, cursorIndex + 1 + pageSize))
		: results.slice(0, pageSize);
};

module.exports.createStore = () => {
	const db = new Sequelize({
		dialect: "sqlite",
		storage: "./store.sqlite",
		logging: console.log,
	});

	const instruments = db.define("instruments", {
		createdAt: DataTypes.DATE,
		symbol: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		description: DataTypes.STRING,
		exchange: DataTypes.STRING,
		ipoDate: DataTypes.STRING,
		couponRate: DataTypes.FLOAT,
		couponAnnualAmount: DataTypes.FLOAT,
		parValue: DataTypes.FLOAT,
		callValue: DataTypes.FLOAT,
		callDate: DataTypes.STRING,
		maturityDate: DataTypes.STRING,
		moodysRating: DataTypes.STRING,
		spRating: DataTypes.STRING,
		distributionDates: DataTypes.STRING,
	});

	db.sync({
		// force: true
	});

	return { db, instruments };
};
