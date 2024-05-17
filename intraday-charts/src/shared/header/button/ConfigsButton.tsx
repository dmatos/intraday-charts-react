import {Box, Button, Dialog} from "@mui/material";
import {Settings} from "@mui/icons-material";
import React, {useState} from "react";
import {IndicatorConfigPage} from "../../layouts/IndicatorConfigPage";
import {getConfigsByIndicator, getConfigurableIndicators} from "../../model/configs/Configs";
import {IndicatorType} from "../../model/IndicatorType.enum";

function ConfigsButton(){

    const [open, setOpen] = useState(false);
    const [selectedIndicator, setSelectedIndicator] = useState(IndicatorType.MACD);

    function openDialog (){
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleClick(indicatorType: IndicatorType){
        setSelectedIndicator(indicatorType);
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
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
            >
                <Box display={"grid"}
                     justifyItems={"center"}
                     alignItems={"center"}
                     alignSelf={"center"}
                     justifySelf={"center"}
                     paddingBlock={"1em"}
                     gridTemplateColumns={`repeat(${getConfigurableIndicators().length}, ${12/getConfigurableIndicators().length}fr)`}
                >
                    {getConfigurableIndicators().map((indicator)=>{
                        return (
                            <Button
                                key={indicator}
                                variant="contained"
                                color={"primary"}
                                onClick={() => handleClick(indicator)}>
                                <strong>{IndicatorType[indicator]}</strong>
                            </Button>
                        )
                    })}
                </Box>
                <Box display={"grid"}
                     justifyItems={"center"}
                     alignItems={"end"}
                     alignSelf={"center"}
                     justifySelf={"center"}
                     paddingBlock={"1em"}
                >
                    <IndicatorConfigPage  key={selectedIndicator} configs={getConfigsByIndicator(selectedIndicator)}/>
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
