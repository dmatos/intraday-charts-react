import {IFetchDataService} from "./IFetchData.service";
import DataFetcherParams from "./DataFetcherParams";
import {VWAPResponse} from "../../model/response/VWAPResponse";

export class VWAPFetcherService implements IFetchDataService {
    fetchData = async (params: DataFetcherParams) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    tickerCode: params.ticker,
                    begin: params.dateBegin,
                    end: params.dateEnd,
                    chronoUnit: "MINUTES",
                    timeframe: params.timeframe

                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/vwap/${params.exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: VWAPResponse|null) => {
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
