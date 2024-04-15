import {Candle} from "./Candle.model";

export interface CandlestickResponse{
    tickerCode: string,
    stockExchangeCode: string,
    candles: Candle[]
}
