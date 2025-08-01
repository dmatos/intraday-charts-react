import {IFetchDataService} from "./IFetchData.service";
import DataFetcherParams from "./DataFetcherParams";
import Configs from "../../model/configs/Configs";
import {PIPConfigKeys} from "../../model/configs/ConfigKeys.model";
import {PIPResponse} from "../../model/response/PIPResponse.model";

export class PIPFetcherService implements IFetchDataService {
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
                    numberOfPoints: Configs.get(PIPConfigKeys[PIPConfigKeys.NumOfPointsKey])?.value

                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/pip/dayly/${params.exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: PIPResponse|null) => {
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
