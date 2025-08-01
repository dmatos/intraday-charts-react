import React, {useEffect, useRef} from "react";
import {Box} from "@mui/material";
import {Chart} from "../model/Chart.model";

export const ChartBox:React.FC<{chart: Chart}> = ({chart}) => {

    const boxRef = useRef<HTMLElement>(null);

    useEffect(()=> {
        console.debug("ChartBox");
        const currentBoxRef = boxRef.current;
        chart?.chartBoxProps?.callbackFn(currentBoxRef, chart);
        return () => {
            if(currentBoxRef){
                currentBoxRef.childNodes.forEach((n) => {
                    currentBoxRef.removeChild(n);
                })
            }
        }
    }, [chart, boxRef]);

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
