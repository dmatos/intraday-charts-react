import {Slider} from "@mui/material";
import React, {useState} from "react";
import Configs, {ConfigItem} from "../../model/configs/Configs";

export const SliderInput:React.FC<{config:ConfigItem}> = ({config}) =>{

    const [configItem, setConfigItem] = useState(config);

    function onChangeValue(event: Event){
        const inputElement = event.target as HTMLInputElement;
        setConfigItem((prevConfig) => {
            let config = {...prevConfig};
            config.value = +inputElement.value;
            Configs.set(config.key, config);
            return config;
        })
    }

    return (
        <Slider
            value={configItem.value}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={configItem.min}
            max={configItem.max}
            name={configItem.key}
            key={configItem.key}
            onChange={(event) => onChangeValue(event)}
        />
    )
}
