export interface IFetchDataService {
    fetchData: (exchange: string, ticker: string, dateBegin: string, dateEnd: string, timeframe: number) => Promise<any>
}
