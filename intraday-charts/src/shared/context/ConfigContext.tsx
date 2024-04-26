import React, {createContext, useMemo, useReducer} from "react";

export const putConfigs = "putConfigs";
export const getConfigs = "getConfigs";

export interface ConfigProps{
    configs: Map<string,string>
}

const configProps: ConfigProps = {
    configs: new Map<string, string>()
}

export interface ConfigAction{
    type: string,
    payload: ConfigProps
}

function configReducer(state: ConfigProps, action:ConfigAction){
    console.debug(action);
    switch (action.type){
        case putConfigs:
            return {
                ...state,
                configs: action.payload?.configs
            };
        case getConfigs:
        default:
            return {
                ...state
            };
    }
}

export interface IConfigContext{
    configState: ConfigProps,
    configDispatch: React.Dispatch<ConfigAction>
}

export const ConfigContext = createContext({} as IConfigContext);

export const ConfigProvider = ({children}:{children:React.ReactNode}) => {
    const [configState, configDispatch] = useReducer(configReducer, configProps);
    const context = useMemo(()=>{
        return {configState, configDispatch}
    },[configState,configDispatch])
    return (
        <ConfigContext.Provider value = {context}>
            {children}
        </ConfigContext.Provider>
    )
}
