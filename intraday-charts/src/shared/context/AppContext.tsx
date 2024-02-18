import React, {createContext, useContext, useReducer} from "react";
import {AppAction, AppState} from "../model/App.model";

export const setSelectedStockExchange = "setSelectedStockExchange";
export const setSelectedTicker = "setSelectedTicker";
export const setStartDate = "setStartDate";
export const setEndDate = "setEndDate";

const initialState: AppState = {
    selectedStockExchange: "",
    selectedTicker: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
}

function appReducer(state: AppState, action: AppAction): AppState{
    console.log(action)
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
        default: {
            return {
                ...state
            }
        }
    }
}

const AppContext = createContext(initialState);
const AppDispatchContext = createContext((action: AppAction)=>{useReducer(appReducer, initialState, ()=>initialState)});

const AppProvider = ({children}:{children:React.ReactNode}) => {
    const [state, dispatch] = useReducer(appReducer, initialState, ()=>initialState);
    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    )
}

export function useApp(){
    return useContext(AppContext);
}

export function useAppDispatch(){
    return useContext(AppDispatchContext)
}


export {AppProvider}
