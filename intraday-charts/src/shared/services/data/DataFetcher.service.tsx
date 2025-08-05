import {IndicatorType} from "../../model/IndicatorType.enum";
import {CandlestickService} from "./Candlestick.service";
import DataFetcherParams from "./DataFetcherParams";
import {MACDFetcherService} from "./MACDFetcher.service";
import {RSIFetcherService} from "./RSIFetcher.service";
import {EMAFetcherService} from "./EMAFetcher.service";
import {BollingerBandsFetcherService} from "./BollingerBandsFetcher.service";
import {PIPFetcherService} from "./PIPFetcher.service";
import {VWAPFetcherService} from "./VWAPFetcher.service";

export class DataFetcherService{
    async execute(indicatorType: IndicatorType, params: DataFetcherParams){
        switch (indicatorType){
            case IndicatorType.Candlestick:
            case IndicatorType.Volume:
                return new CandlestickService().fetchData(params);
            case IndicatorType.MACD:
                return new MACDFetcherService().fetchData(params);
            case IndicatorType.RSI:
                return new RSIFetcherService().fetchData(params);
            case IndicatorType.EMA:
                return new EMAFetcherService().fetchData(params);
            case IndicatorType.Bands:
                return new BollingerBandsFetcherService().fetchData(params);
            case IndicatorType.PIP:
                return new PIPFetcherService().fetchData(params);
            case IndicatorType.VWAP:
                return new VWAPFetcherService().fetchData(params);
            default:
                return async () => {
                    console.debug("No data fetcher available");
                };
        }
    }
}
