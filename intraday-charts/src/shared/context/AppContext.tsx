import React, {createContext, useReducer} from "react";
import {AppAction, AppState} from "../model/App.model";

export const setSelectedStockExchange = "setSelectedStockExchange";
export const setSelectedTicker = "setSelectedTicker";
export const setStartDate = "setStartDate";
export const setEndDate = "setEndDate";
export const setTimeframe = "setTimeframe";


const initialState: AppState = {
    selectedStockExchange: "",
    selectedTicker: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    timeframe: 5
}

function appReducer(state: AppState, action: AppAction): AppState{
    console.debug(action);
    switch (action.type){
        case setSelectedStockExchange:{
            return {
                ...state,
                selectedStockExchange:  action.payload
            };
        }
        case setSelectedTicker:{
            return {
                ...state,
                selectedTicker:  action.payload
            };
        }
        case setStartDate:{
            return {
                ...state,
                startDate: action.payload
            };
        }
        case setEndDate:{
            return {
                ...state,
                endDate: action.payload
            };
        }
        case setTimeframe:{
            return {
                ...state,
                timeframe: isNaN(+action.payload)?5:+action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

interface IAppContext{
    appState: AppState,
    appDispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext({} as IAppContext);

const AppProvider = ({children}:{children:React.ReactNode}) => {
    const [appState, appDispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{appState: appState, appDispatch: appDispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider}
