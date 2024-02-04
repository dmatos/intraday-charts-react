import React, {createContext, useContext, useReducer} from "react";
import {AppAction, AppState} from "../model/App.model";

const initialState: AppState = {
    selectedStockExchange: "",
    selectedTicker: "",
    selectedDate: new Date().toISOString()
}

function appReducer(state: AppState, action: AppAction): AppState{
    console.log(action)
    switch (action.type){
        case "setSelectedStockExchange":{
            return {
                ...state,
                selectedStockExchange:  action.payload
            };
        }
        case "setSelectedTicker":{
            return {
                ...state,
                selectedTicker:  action.payload
            };
        }
        case "setSelectedDate":{
            return {
                ...state,
                selectedDate: action.payload
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
