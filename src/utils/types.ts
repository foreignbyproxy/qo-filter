export interface Stock {
	callDate: string
	callValue: number
	couponAnnualAmount: number
	couponRate: number
	description: string
	distributionDates: string
	exchange: string
	ipoDate: string
	maturityDate: string
	moodysRating: string
	parValue: number
	ratingsDate: string
	spRating: string
	symbol: string
	updatedAt: number
}

export interface StockQueryParama {
	offset: number;
	limit: number;
	orderBy: string;
	orderDirection: string;
}
