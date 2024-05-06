import {Box, Button, Dialog} from "@mui/material";
import {Settings} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {IndicatorConfigPage} from "../../layouts/IndicatorConfigPage";
import {getConfigsByIndicator} from "../../model/configs/Configs";
import {IndicatorContext} from "../../context/IndicatorContext";

function ConfigsButton(){

    const [open, setOpen] = useState(false);
    const {indicatorState} = useContext(IndicatorContext);

    function openDialog (){
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box display={"grid"}>
            <Button
                variant="contained"
                color={"primary"}
                onClick={openDialog}
            >
                <Settings/>
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
            >
                <Box>
                    {Array.from(indicatorState.indicators).map((indicator)=>{
                        return(
                            <IndicatorConfigPage  key={`${indicator}`} configs={getConfigsByIndicator(indicator)}/>
                                )
                            })}
                        </Box>
                        <Box display={"grid"}
                    justifyItems={"end"}>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Dialog>
        </Box>
    )
}

export default ConfigsButton;
