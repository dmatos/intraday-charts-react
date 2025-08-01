import {Box} from "@mui/material";
import {ChartBox} from "./ChartBox";
import React from "react";
import {Charts} from "../services/IChartListFactory.service";

export const ChartsContainer:React.FC<{charts:Charts}> = ({charts}) => {

    const renderMainChart = () => {
        console.debug(`Render MAIN ${!!charts.mainChart}`);
        return (
            charts.mainChart? <Box>
                <ChartBox chart={charts.mainChart}></ChartBox>
            </Box> : null
        );
    }

    const renderChartList = () => {
        console.debug(`Render LIST ${!!charts.chartList}`);
        return (
            charts.chartList?
            charts.chartList.map((chart) => {
                return (
                    <Box key={chart.id}>
                        <ChartBox chart={chart}></ChartBox>
                    </Box>
                )
            }):null
        )
    }

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
            {renderMainChart()}
            {renderChartList()}
        </Box>
    )
}
