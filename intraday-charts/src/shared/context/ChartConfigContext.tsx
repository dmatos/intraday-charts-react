import React, {createContext, useReducer} from "react";
import {ChartConfig} from "../model/ChartConfig.model";

export const upsertChartConfig = "upsertChartConfig";

export interface ConfigState{
    configs: Map<string,ChartConfig>
}

const configProps: ConfigState = {
    configs: new Map<string, ChartConfig>()
}

export interface ChartConfigPayload {
    key: string,
    config: ChartConfig
}

export interface ChartConfigAction{
    type: string,
    payload: ChartConfigPayload
}

function chartConfigReducer(state:ConfigState, action: ChartConfigAction){
    console.debug(action);
    switch (action.type){
        case upsertChartConfig: {
            state.configs.set(action.payload.key, action.payload.config);
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}

export interface IChartConfigContext{
    chartConfigState: ConfigState,
    chartConfigDispatch: React.Dispatch<ChartConfigAction>
}

export const ChartConfigContext = createContext({} as IChartConfigContext);

export const ChartConfigProvider = ({children}:{children:React.ReactNode}) => {
    const [chartConfigState, chartConfigDispatch] = useReducer(chartConfigReducer, configProps);
    return (
        <ChartConfigContext.Provider value = {{chartConfigState: chartConfigState, chartConfigDispatch: chartConfigDispatch}}>
            {children}
        </ChartConfigContext.Provider>
    )
}
