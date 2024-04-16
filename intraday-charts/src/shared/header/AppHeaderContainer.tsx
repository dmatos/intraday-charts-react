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
import {useContext, useEffect, useState} from "react";
import {Ticker} from "../model/Ticker.model";
import {IFetchDataService} from "../services/IFetchData.service";
import {NotificationContext, showErrorMessage} from "../context/NotificationContext";
import {IResponseHandlerService} from "../services/response/handler/IResponseHandler.service";

export default function AppHeaderContainer(service: Readonly<IFetchDataService>, responseHandlerService: Readonly<IResponseHandlerService>){

    const[stockExchange2TickersMap, setStockExchange2TickersMap] = useState<Map<string, string[]>>(new Map());
    const[filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const {appState, appDispatch} = useContext(AppContext);
    const notificationContext = useContext(NotificationContext);

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
            .catch(error => {
                console.error(error);
                notificationContext.notificationDispatch( {
                    type: showErrorMessage,
                    payload: error.status
                })
            });
    }, [notificationContext])

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

    function onExecute(){
        responseHandlerService.handleResponse(service.fetchData(
            appState.selectedStockExchange,
            appState.selectedTicker,
            appState.startDate,
            appState.endDate,
            appState.timeframe
        ));
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

    const executeButtonCallbackFn = {
        callbackFn: onExecute
    }

    const insertIndicator = {
        callbackFn: () => {
            //TODO call modal with a list of indicators
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
