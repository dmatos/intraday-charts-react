import DateInput, {DateInputData} from "./date/DateInput";
import ExecuteButton, {ExecuteButtonData} from "./button/ExecuteButton";
import React from "react";
import AutocompleteInput, {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {Box, useTheme} from "@mui/material";

export interface AppHeaderProps{
    stockExchangeInput: AutocompleteInputData,
    tickerInput: AutocompleteInputData,
    startDateCallbackFn: DateInputData,
    endDateCallbackFn: DateInputData
    executeButtonCallbackFn: ExecuteButtonData
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
            gridTemplateColumns={"repeat(5,2fr)"}
            alignSelf={"center"}
            justifyItems={"stretch"}
            alignContent={"center"}
            bgcolor={theme.palette.background.default}
        >
            <Box display="grid" bgcolor={theme.palette.background.paper}>
                <AutocompleteInput {...props.stockExchangeInput}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.paper}>
                <AutocompleteInput {...props.tickerInput}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.paper}>
                <DateInput {...props.startDateCallbackFn}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.paper}>
                <DateInput {...props.endDateCallbackFn}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.default}>
                <ExecuteButton {...props.executeButtonCallbackFn}/>
            </Box>
        </Box>
    )
}
export default AppHeader;
