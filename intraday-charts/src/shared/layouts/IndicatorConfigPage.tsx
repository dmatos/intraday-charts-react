import React, {Fragment} from "react";
import {ConfigItem} from "../model/configs/Configs";
import {Box} from "@mui/material";
import {SliderInput} from "../header/number/SliderInput";

export const IndicatorConfigPage:React.FC<{configs: (ConfigItem|undefined)[]}> = (props) => {

    return (
        <Box>
            {
                props?.configs?.map(config => {
                    return (
                        <Fragment key={config?.key}>
                            <Box
                                display={"grid"}
                                justifyItems={"center"}
                            >
                                <b>{config?.description}</b>
                            </Box>
                            <Box
                                display={"grid"}
                                justifyItems={"center"}
                            >
                                {config?<SliderInput config={config}/>:null}
                            </Box>
                        </Fragment>
                    )
                })
            }
        </Box>
    )
}
