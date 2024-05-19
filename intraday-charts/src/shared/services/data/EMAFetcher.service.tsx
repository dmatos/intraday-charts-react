import DataFetcherParams from "./DataFetcherParams";
import Configs from "../../model/configs/Configs";
import {EMAConfigKeys} from "../../model/configs/ConfigKeys.model";
import {IFetchDataService} from "./IFetchData.service";
import {MovingAverageResponse} from "../../model/response/MovingAverageResponse.model";

export class EMAFetcherService implements IFetchDataService {
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
                    signal: Configs.get(EMAConfigKeys[EMAConfigKeys.SignalKey])?.value,
                    signalDelay: Configs.get(EMAConfigKeys[EMAConfigKeys.SignalDelayKey])?.value
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/ma/ema/${params.exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: MovingAverageResponse|null) => {
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
