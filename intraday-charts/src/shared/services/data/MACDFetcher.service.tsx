import DataFetcherParams from "./DataFetcherParams";
import {IFetchDataService} from "./IFetchData.service";
import Configs from "../../model/configs/Configs";
import {MacdResponse} from "../../model/response/MacdResponse.model";
import {MACDConfigKeys} from "../../model/configs/ConfigKeys.model";

export class MACDFetcherService implements IFetchDataService {
    fetchData = async (params: DataFetcherParams) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    tickerCode: params.ticker,
                    begin: params.dateBegin,
                    end: params.dateEnd,
                    chronoUnit: "MINUTES",
                    timeframe: params.timeframe,
                    fastSignal: Configs.get(MACDConfigKeys[MACDConfigKeys.FastSignalKey])?.value,
                    slowSignal: Configs.get(MACDConfigKeys[MACDConfigKeys.SlowSignalKey])?.value,
                    signal: Configs.get(MACDConfigKeys[MACDConfigKeys.SignalKey])?.value,
                    signalDelay: Configs.get(MACDConfigKeys[MACDConfigKeys.SignalDelayKey])?.value
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
                .then((data: MacdResponse|null) => {
                    resolve(data);
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
