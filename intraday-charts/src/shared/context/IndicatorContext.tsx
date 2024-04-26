import {IndicatorType} from "../model/IndicatorType.enum";
import {IndicatorData} from "../model/IndicatorData.model";
import React, {createContext, useMemo, useReducer} from "react";

export const pushIndicator = "pushIndicator";
export const popIndicator = "popIndicator";

export interface IndicatorProps {
    indicators: Set<IndicatorType>,
    mainChartType: IndicatorType
}

const indicatorProps: IndicatorProps = {
    indicators: new Set<IndicatorType>(),
    mainChartType: IndicatorType.Candlestick
}


export interface IndicatorAction{
    type: string,
    payload: IndicatorData
}

function indicatorReducer(state: IndicatorProps, action: IndicatorAction) {
    console.debug(action);
    switch (action.type){
        case pushIndicator: {
            state.indicators.add( action.payload.type);
            return {...state};
        }
        case popIndicator:{
            state.indicators.delete(action.payload.type);
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}

export interface IIndicatorContext{
    indicatorState: IndicatorProps,
    indicatorDispatch: React.Dispatch<IndicatorAction>
}

export const IndicatorContext = createContext({} as IIndicatorContext);

export const IndicatorProvider = ({children}:{children:React.ReactNode}) => {
    const [indicatorState, indicatorDispatch] = useReducer(indicatorReducer, indicatorProps);
    const context = useMemo(()=>{
        return {indicatorState, indicatorDispatch}
    },[indicatorState,indicatorDispatch])
    return (
        <IndicatorContext.Provider value = {context}>
            {children}
        </IndicatorContext.Provider>
    )
}
