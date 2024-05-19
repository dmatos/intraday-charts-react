import DataFetcherParams from "./DataFetcherParams";

export interface IFetchDataService {
    fetchData: (params:DataFetcherParams) => Promise<any>
}
