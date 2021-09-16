const { Sequelize, DataTypes } = require("sequelize");

module.exports.createStore = () => {
	const db = new Sequelize({
		dialect: "sqlite",
		storage: "./store.sqlite",
		logging: console.log,
	});

	const stocks = db.define("stocks", {
		createdAt: DataTypes.DATE,
		symbol: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		description: DataTypes.STRING,
		exchange: DataTypes.STRING,
		ipoDate: DataTypes.STRING,
		couponRate: DataTypes.FLOAT,
		couponType: DataTypes.STRING,
		couponAnnualAmount: DataTypes.FLOAT,
		parValue: DataTypes.FLOAT,
		callValue: DataTypes.FLOAT,
		callDate: DataTypes.STRING,
		maturityDate: DataTypes.STRING,
		moodysRating: DataTypes.STRING,
		spRating: DataTypes.STRING,
		distributionDates: DataTypes.STRING,
		favorite: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});

	db.sync({
		// force: true
	});

	return { db, stocks };
};
