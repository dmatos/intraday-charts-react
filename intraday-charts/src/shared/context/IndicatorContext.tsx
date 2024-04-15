import {IndicatorType} from "../model/IndicatorType.enum";
import {IndicatorData} from "../model/IndicatorData.model";
import React, {createContext, useReducer} from "react";

export const upsertMainIndicator = "upsertMainIndicator";
export const pushIndicator = "pushIndicator";
export const popIndicator = "popIndicator";

export interface IndicatorProps {
    indicators: IndicatorData[],
    mainChartType: IndicatorType
}

const indicatorProps: IndicatorProps = {
    indicators: [],
    mainChartType: IndicatorType.Candlestick
}


export interface IndicatorAction{
    type: string,
    payload: IndicatorData
}

function indicatorReducer(state: IndicatorProps, action: IndicatorAction) {
    console.debug(action);
    switch (action.type){
        case upsertMainIndicator: {
            state.indicators[0] = {
                type: action.payload.type,
                data: action.payload.data
            };
            return {
                ...state,
                mainChartType: action.payload.type
            };
        }
        case pushIndicator: {
            state.indicators.push(
                {
                    type: action.payload.type,
                    data: action.payload.data
                }
            );
            return {...state};
        }
        case popIndicator:{
            state.indicators.pop();
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
    return (
        <IndicatorContext.Provider value = {{indicatorState: indicatorState, indicatorDispatch: indicatorDispatch}}>
            {children}
        </IndicatorContext.Provider>
    )
}
