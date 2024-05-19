import {LayouBaseChartsPage} from "../shared/layouts/LayoutBaseChartsPage";
import AppHeaderContainer from "../shared/header/AppHeaderContainer";
import {Box, useTheme} from "@mui/material";
import React, {ReactNode} from "react";
import {AppMainContainer} from "../shared/main/AppMainContainer";
import NotificationContainer from "../shared/main/NotificationContainer";
import {DataFetcherService} from "../shared/services/data/DataFetcher.service";
import {ChartListFactoryService} from "../shared/services/ChartListFactory.service";
import {LightweightChartsApiService} from "../shared/services/api/charts/LightweightChartsApi.service";

const PlaceholderComponent = () => {
    const theme = useTheme();
    return(
        <Box border={"1px solid"} display={"grid"} height={"50vh"} bgcolor={theme.palette.background.default} alignContent={"center"}>
        </Box>
    )
}
export const ChartsPage:React.FC<{children:ReactNode}> = ({children})=>{

    const theme = useTheme();

    const chartListFactoryService = new ChartListFactoryService(new LightweightChartsApiService(
        {
            layout: {
                background: { color: theme.palette.background.default },
                textColor: theme.palette.text.primary,
            },
            grid: {
                vertLines: { color: theme.palette.background.paper },
                horzLines: { color: theme.palette.background.paper},
            }
        }));

    return (
        <div>
            <LayouBaseChartsPage
                header={AppHeaderContainer()}
                main={AppMainContainer( {chartListFactoryService, dataFetcher: new DataFetcherService()})}
                footer={PlaceholderComponent()}>
                {children}
            </LayouBaseChartsPage>
            <NotificationContainer/>
        </div>
    )
}
