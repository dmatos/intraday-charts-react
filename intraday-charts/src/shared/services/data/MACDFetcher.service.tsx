import DataFetcherParams from "./DataFetcherParams";
import {IFetchDataService} from "./IFetchData.service";
import {CandlestickResponse} from "../../model/CandlestickResponse.model";

export enum MACDConfigKeys {
    FastSignalKey,
    SlowSignalKey,
    SignalKey,
    SignalDelay
}

export class MACDFetcherService implements IFetchDataService {
    fetchData = async (params: DataFetcherParams, configs: Map<string,string>) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    tickerCode: params.ticker,
                    begin: params.dateBegin,
                    end: params.dateEnd,
                    chronoUnit: "MINUTES",
                    timeframe: params.timeframe,
                    fastSignal: configs.get(MACDConfigKeys[MACDConfigKeys.FastSignalKey]),
                    slowSignal: configs.get(MACDConfigKeys[MACDConfigKeys.SlowSignalKey]),
                    signal: configs.get(MACDConfigKeys[MACDConfigKeys.SignalKey]),
                    signalDelay: configs.get(MACDConfigKeys[MACDConfigKeys.SignalDelay])
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/ma/macd/${params.exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: CandlestickResponse|null) => {
                    if(data){
                        resolve(data.candles);
                    }
                })
                .catch(
                    (error) => {
                        console.log(`reject ${error}`)
                        reject(error);
                    }
                )
        });
    }
}
