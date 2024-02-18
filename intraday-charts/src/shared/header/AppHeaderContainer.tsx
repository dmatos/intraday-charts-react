import AppHeader, {AppHeaderProps} from "./AppHeader";
import {
    setEndDate,
    setSelectedStockExchange,
    setSelectedTicker,
    setStartDate,
    useAppDispatch
} from "../context/AppContext";
import {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {DateInputData} from "./date/DateInput";
import {useEffect, useState} from "react";
import {Ticker} from "../model/Ticker.model";

export default function AppHeaderContainer(){

    const[stockExchange2TickersMap, setStockExchange2TickersMap] = useState<Map<string, string[]>>(new Map());
    const[filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        fetch("http://localhost:8080/intraday/tickers/search/_")
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

    const setDateAndFormat = (type:string) => {
        return (year:string, month:string, day:string): void => {
            let formattedDate = [year,month.padStart(2,"0"),day.padStart(2,"0")].join("-");
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
        onChangeFn: setDateAndFormat(setStartDate)
    }

    let endDateCallbackFn:DateInputData = {
        onChangeFn: setDateAndFormat(setEndDate)
    }

    let appHeaderProps:AppHeaderProps = {
        stockExchangeInput,
        tickerInput,
        startDateCallbackFn,
        endDateCallbackFn
    }

    return (
        <AppHeader {...appHeaderProps} />
    )
}
