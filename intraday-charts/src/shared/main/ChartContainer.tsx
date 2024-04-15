import {ChartBox} from "./ChartBox";
import {useCallback, useContext, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {Chart} from "../model/Chart.model";
import {IndicatorContext} from "../context/IndicatorContext";
import {Charts, IChartListFactory} from "../services/IChartListFactory.service";
import {AppContext} from "../context/AppContext";

export default function ChartContainer(
    chartListFactoryService: IChartListFactory) {

    const{appState} = useContext(AppContext);
    const {indicatorState} = useContext(IndicatorContext);
    const [charts, setCharts] = useState({mainChart: {} as Chart, chartList: []} as Charts);

    const windowResizeListener = useCallback(() => {
        setCharts(chartListFactoryService.getChartList(indicatorState.indicators, appState.selectedTicker));
    },[indicatorState.indicators, appState.selectedTicker]);

    useEffect(() => {
        setCharts(chartListFactoryService.getChartList(indicatorState.indicators, appState.selectedTicker));
        window.addEventListener('resize', windowResizeListener, false);
        return () => {
            window.removeEventListener('resize', windowResizeListener, false);
        }
    }, [windowResizeListener, indicatorState, appState]);


    return (
        <Box  overflow={"hidden"}
              sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  overflowY: "scroll",
                  height: "90vh"
              }}>
            <Box>
                {ChartBox(charts.mainChart)}
            </Box>
            <Box>
                {charts.chartList.map((chart) => ChartBox(chart))}
            </Box>
        </Box>
    )
}
