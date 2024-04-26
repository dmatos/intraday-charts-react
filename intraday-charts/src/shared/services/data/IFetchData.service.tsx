import DataFetcherParams from "./DataFetcherParams";

export interface IFetchDataService {
    fetchData: (params:DataFetcherParams, configs:Map<string,string>) => Promise<any>
}
