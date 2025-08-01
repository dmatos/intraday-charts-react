import DataFetcherParams from "./DataFetcherParams";
import {IFetchDataService} from "./IFetchData.service";
import Configs from "../../model/configs/Configs";
import {RSIConfigKeys} from "../../model/configs/ConfigKeys.model";
import {RSIResponse} from "../../model/response/RSIResponse.model";

export class RSIFetcherService implements IFetchDataService {
    fetchData = async (params:DataFetcherParams) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    tickerCode: params.ticker,
                    begin: params.dateBegin,
                    end: params.dateEnd,
                    chronoUnit: "MINUTES",
                    timeframe: params.timeframe,
                    numberOfCandles: Configs.get(RSIConfigKeys[RSIConfigKeys.NumberOfCandles])?.value,
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/rsi/${params.exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: RSIResponse|null) => {
                    if(data){
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
