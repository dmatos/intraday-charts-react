import React from "react";
import {Autocomplete, TextField} from "@mui/material";

export interface AutocompleteInputData{
    onChange: (value: string|null) => void,
    options: string[],
    label: string,
    id: string
}
const AutocompleteInput  = ({onChange, options, label, id}:AutocompleteInputData) =>{
    return (
        <div className={"AutocompleteInput"}>
            <Autocomplete
                onChange={(event, newValue) => onChange(newValue)}
                id={id}
                options={options}
                renderInput={(params) => <TextField {...params} label={label}/>}
            />
        </div>
    )
}
export default AutocompleteInput;
