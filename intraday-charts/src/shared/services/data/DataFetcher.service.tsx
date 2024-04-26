import {IndicatorType} from "../../model/IndicatorType.enum";
import {CandlestickService} from "./Candlestick.service";
import DataFetcherParams from "./DataFetcherParams";
import {MACDFetcherService} from "./MACDFetcher.service";

export class DataFetcherService{
    async execute(indicatorType: IndicatorType, params: DataFetcherParams, configs: Map<string,string>){
        switch (indicatorType){
            case IndicatorType.Candlestick:
                return new CandlestickService().fetchData(params);
            case IndicatorType.MACD:
                return new MACDFetcherService().fetchData(params, configs);
            default:
                return async () => {console.debug("No data fetcher available.")};
        }
    }
}
