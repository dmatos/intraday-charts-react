import {Box, Button, Dialog} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";
import React, {useState} from "react";
import AutocompleteInput from "../autocomplete/AutocompleteInput";
import {IndicatorType} from "../../model/IndicatorType.enum";
import {IAddIndicatorCallbackFn} from "./IAddIndicatorCallbackFn";


function InsertIndicatorButton(addIndicatorCallback: Readonly<IAddIndicatorCallbackFn>) {

    const [open, setOpen] = useState(false);
    const [selectedIndicator, setSelectedIndicator] = useState("");

    const options = [IndicatorType[IndicatorType.MACD], IndicatorType[IndicatorType.RSI]];

    function openDialog (){
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const selectIndicator = (type: string|null) => {
        if(type){
            setSelectedIndicator(type);
        }
    }

    const addIndicator = () => {
        if(selectedIndicator){
            addIndicatorCallback.callbackFn(selectedIndicator);
        }
    }

    return (
        <Box display={"grid"}>
            <Button
                variant="contained"
                color={"primary"}
                onClick={openDialog}
            >
                <LibraryAdd/>
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
            >
                <Box height={`${5*options.length}vh`}>
                    <AutocompleteInput
                        {
                            ...{
                                onChange: selectIndicator,
                                options: options,
                                label: 'Add Indicator',
                                id: 'addIndicator'
                            }
                        }
                    />
                </Box>
                <Box display={"grid"}
                     gridTemplateColumns={"6fr 6fr"}
                     justifyItems={"end"}
                >
                    <Button onClick={addIndicator}>
                        Add
                    </Button>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Dialog>
        </Box>
    )
}

export default InsertIndicatorButton;
