import DateInput, {DateInputData} from "./date/DateInput";
import RenderChartsButton from "./button/RenderChartsButton";
import React from "react";
import AutocompleteInput, {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {Box, useTheme} from "@mui/material";
import TimeframeInput, {TimeframeProps} from "./number/TimeframeInput";
import {IButtonCallbackFn} from "./button/IButtonCallbackFn";
import InsertIndicatorButton from "./button/InsertIndicatorButton";

export interface AppHeaderProps{
    stockExchangeInput: AutocompleteInputData,
    tickerInput: AutocompleteInputData,
    startDateCallbackFn: DateInputData,
    endDateCallbackFn: DateInputData
    renderChartsCallbackFn: IButtonCallbackFn,
    timeframeCallbackFn: TimeframeProps,
    insertIndicator: IButtonCallbackFn
}

const AppHeader = (props: AppHeaderProps) => {
    const theme = useTheme();
    return (
        <Box
            display="grid"
            gap={"10px"}
            height={'6vh'}
            minHeight={'55px'}
            padding={'10px'}
            gridTemplateColumns={"repeat(12, 1fr)"}
            alignSelf={"center"}
            justifyItems={"center"}
            marginBottom={"10px"}
            bgcolor={theme.palette.background.default}
        >
            <Box display="grid" justifySelf={"stretch"} bgcolor={theme.palette.background.paper}>
                <AutocompleteInput {...props.stockExchangeInput}/>
            </Box>
            <Box display="grid" justifySelf={"stretch"} justifyItems={"stretch"} bgcolor={theme.palette.background.paper}>
                <AutocompleteInput {...props.tickerInput}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.paper}>
                <TimeframeInput {...props.timeframeCallbackFn}/>
            </Box>
            <Box display="grid" justifySelf={"end"} bgcolor={theme.palette.background.paper}>
                <DateInput {...props.startDateCallbackFn}/>
            </Box>
            <Box display="grid" justifySelf={"start"} bgcolor={theme.palette.background.paper}>
                <DateInput {...props.endDateCallbackFn}/>
            </Box>
            <Box display="grid"justifySelf={"end"}   bgcolor={theme.palette.background.default}>
                <InsertIndicatorButton {...props.insertIndicator}/>
            </Box>
            <Box display="grid" justifySelf={"end"} bgcolor={theme.palette.background.default}>
                <RenderChartsButton {...props.renderChartsCallbackFn}/>
            </Box>
        </Box>
    )
}
export default AppHeader;
