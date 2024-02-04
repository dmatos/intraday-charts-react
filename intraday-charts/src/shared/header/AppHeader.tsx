import DateInput, {DateInputData} from "./date/DateInput";
import ExecuteButton from "./button/ExecuteButton";
import React from "react";
import AutocompleteInput, {AutocompleteInputData} from "./autocomplete/AutocompleteInput";
import {Box, useTheme} from "@mui/material";

export interface AppHeaderProps{
    stockExchangeInput: AutocompleteInputData,
    tickerInput: AutocompleteInputData,
    dateCallbackFn: DateInputData
}

const AppHeader = (props: AppHeaderProps) => {
    const theme = useTheme();
    return (
        <Box
            display="grid"
            gap={"10px"}
            height={'fit-content'}
            gridTemplateColumns={"repeat(4,3fr)"}
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
                <DateInput {...props.dateCallbackFn}/>
            </Box>
            <Box display="grid" bgcolor={theme.palette.background.default}>
                <ExecuteButton/>
            </Box>
        </Box>
    )
}
export default AppHeader;
