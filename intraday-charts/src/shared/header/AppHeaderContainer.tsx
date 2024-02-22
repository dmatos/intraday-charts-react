import AppHeader, {AppHeaderProps} from "./AppHeader";
import {
    setEndDate,
    setSelectedStockExchange,
    setSelectedTicker,
    setStartDate,
    setTimeframe,
    useApp,
    useAppDispatch
} from "../context/AppContext";
import {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {DateInputData} from "./date/DateInput";
import {useEffect, useState} from "react";
import {Ticker} from "../model/Ticker.model";
import {CandlestickService} from "../services/Candlestick.service";

export default function AppHeaderContainer(){

    const[stockExchange2TickersMap, setStockExchange2TickersMap] = useState<Map<string, string[]>>(new Map());
    const[filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const appContext = useApp();

    useEffect(()=>{
        fetch(process.env.REACT_APP_INTRADAY_API_URL+"/intraday/tickers/search/_")
            .then(response => response.json())
            .then((data:Ticker[]) => {
                let se2t = new Map<string, string[]>();
                data.forEach((t) => {
                    let tempArray = se2t.get(t.stockExchangeCode);
                    if (!tempArray) {
                        tempArray = [];
                    }
                    se2t.set(t.stockExchangeCode, [...tempArray, t.code]);
                    setStockExchange2TickersMap(se2t);
                })
            })
            .catch(error => console.error(error));
    }, [])

    const setFormattedDate = (type:string, hms: string) => {
        return (year:string, month:string, day:string): void => {
            let formattedDate = [year,month.padStart(2,"0"),day.padStart(2,"0")].join("-");
            formattedDate = formattedDate + 'T' + hms;
            dispatch({
                type: type,
                payload: formattedDate
            });
        }
    }

    function onSelectStockExchange(stockExchangeCode:string|null){
        if(!stockExchangeCode){
            return;
        }
        let tickers = stockExchange2TickersMap.get(stockExchangeCode);
        if(!tickers)  {
            setFilteredTickers([]);
            return;
        }
        dispatch({
            type: setSelectedStockExchange,
            payload: stockExchangeCode
        });
        setFilteredTickers(tickers);
    }

    function onSelectTicker(selectedValue: string|null){
        if(!!selectedValue && selectedValue.length > 0){
            dispatch({
                type: setSelectedTicker,
                payload: selectedValue
            });
        }
    }

    function onSelectTimeframe(selectedValue: string|null){
        if(!!selectedValue && !isNaN(+selectedValue)){
            dispatch({
                type: setTimeframe,
                payload: selectedValue
            });
        }
    }

    function onExecute(){
        CandlestickService.getCandlestick(
            appContext.selectedStockExchange,
            appContext.selectedTicker,
            appContext.startDate,
            appContext.endDate,
            appContext.timeframe
        ).then( (response) => {
            //TODO dispatch data to app context
            console.log(response);
        }).catch( (error) => {
            //TODO use toast (or smth) to display error
            console.log(error);
        });
    }

    let stockExchangeInput:AutocompleteInputData = {
        options: Array.from(stockExchange2TickersMap.keys()),
        onChange: onSelectStockExchange,
        label: "Exchange",
        id: "combo-box-stock-exchange"
    }

    let tickerInput:AutocompleteInputData = {
        options: filteredTickers,
        onChange: onSelectTicker,
        label: "Ticker",
        id: "combo-box-ticker"
    }

    let startDateCallbackFn:DateInputData = {
        onChangeFn: setFormattedDate(setStartDate, '00:00:00')
    }

    let endDateCallbackFn:DateInputData = {
        onChangeFn: setFormattedDate(setEndDate, '23:59:59')
    }

    let executeButtonCallbackFn = {
        callBackFn: onExecute
    }

    let appHeaderProps:AppHeaderProps = {
        stockExchangeInput,
        tickerInput,
        startDateCallbackFn,
        endDateCallbackFn,
        executeButtonCallbackFn
    }

    return (
        <AppHeader {...appHeaderProps} />
    )
}
