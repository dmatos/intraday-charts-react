import {ChartsContainer} from "./ChartsContainer";
import {IndicatorType} from "../model/IndicatorType.enum";
import {IndicatorContext} from "../context/IndicatorContext";
import {NotificationContext, showErrorMessage, showSuccessMessage} from "../context/NotificationContext";
import React, {useCallback, useContext, useEffect, useReducer, useState} from "react";
import {AppContext} from "../context/AppContext";
import {DataFetcherService} from "../services/data/DataFetcher.service";
import {Charts, IChartListFactory} from "../services/IChartListFactory.service";
import {IndicatorData} from "../model/IndicatorData.model";
import {ConfigContext} from "../context/ConfigContext";

export const AppMainContainer:React.FC< {
    readonly chartListFactoryService: IChartListFactory,
    readonly dataFetcher: DataFetcherService}> = ({chartListFactoryService,dataFetcher}) =>{

    const {indicatorState} = useContext(IndicatorContext);
    const {notificationDispatch} = useContext(NotificationContext);
    const {appState} = useContext(AppContext);
    const {configState} = useContext(ConfigContext);
    const [charts, setCharts] = useState({} as Charts);
    const [indicatorDataMap, indicatorDataMapDispatch] = useReducer(
        (state: {map: Map<IndicatorType,IndicatorData>}, indicatorData: IndicatorData) => {
            return {
                ...state,
                map: state.map.set(indicatorData.type, indicatorData)
            }
        },
        {map: new Map<IndicatorType,IndicatorData>()}
    );

    const renderCharts = () => {
        console.debug(`Main chart id ${charts?.mainChart?.id}`)
        setCharts(chartListFactoryService.getChartList(Array.from(indicatorDataMap.map.values()), appState.selectedTicker));
    };

    const windowResizeListener = useCallback(() => {
        renderCharts();
    },[indicatorState, appState]);

    useEffect(() => {
        renderCharts();
        window.addEventListener('resize', windowResizeListener, false);
        return () => {
            window.removeEventListener('resize', windowResizeListener, false);
        }
    }, [windowResizeListener, indicatorState, appState]);


    const handleResponse = (type: IndicatorType, promise: Promise<any>) => {
        promise.then((response) => {
            console.debug(response);
            indicatorDataMapDispatch({
                type: type,
                data: response
            });
            notificationDispatch({
                type: showSuccessMessage,
                payload: ``
            });
        }).catch((error) => {
            console.debug(error);
            notificationDispatch({
                type: showErrorMessage,
                payload: error.status
            })
        });
    }

    useEffect(() => {
        indicatorState.indicators.forEach((indicator)=>{
            handleResponse(
                indicator,
                dataFetcher.execute(
                    indicator,
                    {
                        timeframe: appState.timeframe,
                        ticker: appState.selectedTicker,
                        exchange: appState.selectedStockExchange,
                        dateEnd: appState.endDate,
                        dateBegin: appState.startDate
                    },
                    configState.configs
                ));
        });
        renderCharts();
    }, [indicatorState,appState]);

    return (
        <ChartsContainer
            charts={chartListFactoryService.getChartList(Array.from(indicatorDataMap.map.values()), appState.selectedTicker)}
        />
    );
}
