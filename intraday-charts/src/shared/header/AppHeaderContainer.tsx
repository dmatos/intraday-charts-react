import AppHeader, {AppHeaderProps} from "./AppHeader";
import {
    AppContext,
    setEndDate,
    setSelectedStockExchange,
    setSelectedTicker,
    setStartDate,
    setTimeframe
} from "../context/AppContext";
import {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {DateInputData} from "./date/DateInput";
import {useContext, useMemo, useState} from "react";
import {Ticker} from "../model/Ticker.model";
import {NotificationContext, showErrorMessage} from "../context/NotificationContext";
import {IndicatorType} from "../model/IndicatorType.enum";
import {IndicatorContext, pushIndicator} from "../context/IndicatorContext";
import {IAddIndicatorCallbackFn} from "./button/IAddIndicatorCallbackFn";
import {IButtonCallbackFn} from "./button/IButtonCallbackFn";

export default function AppHeaderContainer(){

    const[stockExchange2TickersMap, setStockExchange2TickersMap] = useState<Map<string, string[]>>(new Map());
    const[filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const { appDispatch} = useContext(AppContext);
    const {notificationDispatch} = useContext(NotificationContext);
    const {indicatorState,indicatorDispatch} = useContext(IndicatorContext);

    useMemo(()=>{
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
            .catch(error => {
                console.error(error);
                notificationDispatch({
                    type: showErrorMessage,
                    payload: error.status
                })
            })}, []);

    const setFormattedDate = (type:string, hms: string) => {
        return (year:string, month:string, day:string): void => {
            let formattedDate = [year,month.padStart(2,"0"),day.padStart(2,"0")].join("-");
            formattedDate = formattedDate + 'T' + hms;
            appDispatch({
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
        appDispatch({
            type: setSelectedStockExchange,
            payload: stockExchangeCode
        });
        setFilteredTickers(tickers);
    }

    function onSelectTicker(selectedValue: string|null){
        if(!!selectedValue && selectedValue.length > 0){
            appDispatch({
                type: setSelectedTicker,
                payload: selectedValue
            });
        }
    }

    function onSelectTimeframe(selectedValue: string|undefined){
        if(!!selectedValue && !isNaN(+selectedValue)){
            appDispatch({
                type: setTimeframe,
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
        onChangeFn: setFormattedDate(setStartDate, '00:00:00')
    }

    const endDateCallbackFn:DateInputData = {
        onChangeFn: setFormattedDate(setEndDate, '23:59:59')
    }

    const executeButtonCallbackFn: IButtonCallbackFn = {
        callbackFn: () =>{
            indicatorDispatch({
                type: pushIndicator,
                payload: {
                    type: indicatorState.mainChartType,
                    data: []
                }
            });
            indicatorDispatch({
                type: pushIndicator,
                payload: {
                    type: IndicatorType.Volume,
                    data: []
                }
            });
        }
    }

    const insertIndicator: IAddIndicatorCallbackFn = {
        callbackFn: (type:string|null) => {
            if(type) {
                const indicatorType:IndicatorType = IndicatorType[type as keyof typeof IndicatorType];
                indicatorDispatch({
                    type: pushIndicator,
                    payload: {
                        type: indicatorType,
                        data: []
                    }
                })
            }
        }
    }


    let appHeaderProps:AppHeaderProps = {
        stockExchangeInput,
        tickerInput,
        startDateCallbackFn,
        endDateCallbackFn,
        renderChartsCallbackFn: executeButtonCallbackFn,
        timeframeCallbackFn: {onChangeCallback: onSelectTimeframe},
        insertIndicator: insertIndicator
    }

    return (
        <AppHeader {...appHeaderProps} />
    )
}
