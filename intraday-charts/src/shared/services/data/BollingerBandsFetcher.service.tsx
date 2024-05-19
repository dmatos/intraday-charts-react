import DataFetcherParams from "./DataFetcherParams";
import {IFetchDataService} from "./IFetchData.service";
import Configs from "../../model/configs/Configs";
import {EMAConfigKeys} from "../../model/configs/ConfigKeys.model";
import {BandsResponse} from "../../model/response/BandsResponse.model";

export class BollingerBandsFetcherService implements IFetchDataService {
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
            }
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/bands/bollinger/${params.exchange}`, requestOptions)
                .then((response) => {
                    if (response.status >= 400) {
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: BandsResponse | null) => {
                    if (data) {
                        resolve(data);
                    }
                })
                .catch(
                    (error) => {
                        console.log(`reject ${error}`)
                        reject(error);
                    }
                )
        })
    }
}
