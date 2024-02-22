import {CandlestickResponse} from "../model/CandlestickResponse.model";

export const CandlestickService = {
    getCandlestick: async (exchange: string, ticker: string, dateBegin: string, dateEnd: string, timeframe: number) => {
        return new Promise( (resolve,reject) => {
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
            fetch(process.env.REACT_APP_INTRADAY_API_URL+"/intraday/metadata/candlestick/"+exchange, requestOptions)
                .then(response => response.json())
                .then((data: CandlestickResponse) => {
                    resolve(data.candles);
                })
                .catch(error => reject(error));
        });
    }
}
