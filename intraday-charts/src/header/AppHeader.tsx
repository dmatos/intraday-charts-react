import './AppHeader.css'
import DateInput, {DateInputData} from "./date/DateInput";
import ExecuteButton from "./button/ExecuteButton";
import React from "react";
import AutocompleteInput, {AutocompleteInputData} from "./autocomplete/AutocompleteInput";

export interface AppHeaderProps{
    stockExchangeInput: AutocompleteInputData,
    tickerInput: AutocompleteInputData,
    dateCallbackFn: DateInputData
}

const AppHeader = (props: AppHeaderProps) => {
    return (
        <div className="AppHeader">
            <AutocompleteInput {...props.stockExchangeInput}/>
            <AutocompleteInput {...props.tickerInput}/>
            <DateInput {...props.dateCallbackFn}/>
            <ExecuteButton/>
        </div>
    )
}
export default AppHeader;
