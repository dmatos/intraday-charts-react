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
            <Autocomplete
                onChange={(event, newValue) => onChange(newValue)}
                id={id}
                options={options}
                renderInput={(params) =>
                    <TextField variant="filled" {...params} label={label}/>}
            />
    )
}
export default AutocompleteInput;
