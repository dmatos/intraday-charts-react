import {LayouBaseChartsPage} from "../shared/layouts/LayoutBaseChartsPage";
import AppHeaderContainer from "../shared/header/AppHeaderContainer";
import {Box, useTheme} from "@mui/material";
import React, {ReactNode} from "react";
import {AppMainContainer} from "../shared/main/AppMainContainer";
import {CandlestickService} from "../shared/services/Candlestick.service";
import NotificationContainer from "../shared/main/NotificationContainer";
import {
    CandlestickResponseHandlerService
} from "../shared/services/response/handler/CandlestickResponseHandler.service";

const PlaceholderComponent = () => {
    const theme = useTheme();
    return(
        <Box border={"1px solid"} display={"grid"} height={"50vh"} bgcolor={theme.palette.background.default} alignContent={"center"}>
        </Box>
    )
}
export const ChartsPage:React.FC<{children:ReactNode}> = ({children})=>{
    return (
        <div>
            <LayouBaseChartsPage
                header={AppHeaderContainer(new CandlestickService(), new CandlestickResponseHandlerService())}
                main={AppMainContainer()}
                footer={PlaceholderComponent()}>
                {children}
            </LayouBaseChartsPage>
            <NotificationContainer/>
        </div>
    )
}
