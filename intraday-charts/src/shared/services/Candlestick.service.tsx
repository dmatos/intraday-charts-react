import {CandlestickResponse} from "../model/CandlestickResponse.model";
import {IFetchDataService} from "./IFetchData.service";

export class CandlestickService implements IFetchDataService{

    fetchData = async (exchange: string, ticker: string, dateBegin: string, dateEnd: string, timeframe: number) => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    tickerCode: ticker,
                    begin: dateBegin,
                    end: dateEnd,
                    chronoUnit: "MINUTES",
                    timeframe: timeframe
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }
            fetch(process.env.REACT_APP_INTRADAY_API_URL + `/intraday/metadata/candlestick/${exchange}`, requestOptions)
                .then( (response) => {
                    if(response.status >= 400){
                        reject(response);
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then((data: CandlestickResponse|null) => {
                    if(!!data){
                        resolve(data.candles);
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



