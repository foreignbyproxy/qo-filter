export interface AllStockResponse {
	stocks: AllStockQuery;
}

export interface AllStockQuery {
	offset: number;
	limit: number;
	currentPage: number;
	totalPages: number;
	totalStocks: number;
	stocks: Stock[];
}

export interface Stock {
	callDate: string;
	callValue: number;
	couponAnnualAmount: number;
	couponRate: number;
	description: string;
	distributionDates: string;
	exchange: string;
	ipoDate: string;
	maturityDate: string;
	moodysRating: string;
	parValue: number;
	ratingsDate: string;
	spRating: string;
	symbol: string;
	updatedAt: number;
}

export interface StockQueryParameters {
	offset: number;
	limit: number;
	orderBy: string;
	orderDirection: string;
}
