import React, {useEffect, useRef} from "react";
import {Box} from "@mui/material";
import {Chart} from "../model/Chart.model";

export const ChartBox:React.FC<Chart> = (chart: Chart) => {

    const boxRef = useRef<HTMLElement>(null);

    useEffect(()=> {
        console.debug("ChartBox");
        const currentBoxRef = boxRef.current;
        if(chart && chart.chartBoxProps && chart.indicator){
            chart.chartBoxProps.callbackFn(currentBoxRef, chart);
        }
        return () => {
            if(!!currentBoxRef){
                currentBoxRef.childNodes.forEach((n) => {
                    currentBoxRef.removeChild(n);
                })
            }
        }
    }, [chart]);

    return (
        <Box id={chart?.chartBoxProps?.id}
             display={"grid"}
             ref ={boxRef}
             height={chart?.chartBoxProps?.height}
             width={chart?.chartBoxProps?.width}
        >
        </Box>
    )
}
