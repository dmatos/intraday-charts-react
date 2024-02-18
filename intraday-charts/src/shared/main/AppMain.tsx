import React, {useEffect, useRef} from "react";
import {Box} from "@mui/material";

export interface AppMainProps{
    callbackFn: (ref:HTMLElement|null) => void,
    width: number,
    height: number
}

export const AppMain:React.FC<AppMainProps> = (appMainProps:AppMainProps) => {

    const boxRef = useRef<HTMLElement>(null);

    useEffect(()=> {
        appMainProps.callbackFn(boxRef.current);
        return () => {
            if(!!boxRef.current){
                boxRef.current.childNodes.forEach((n) => {
                    boxRef.current?.removeChild(n);
                })
            }
        }
    })

    return (
        <Box id={"chartBox"}
             display={"grid"}
             ref ={boxRef}
             height={'90vh'}
             width={appMainProps.width}
        >
        </Box>
    )
}
