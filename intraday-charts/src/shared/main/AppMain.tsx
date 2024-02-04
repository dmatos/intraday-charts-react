import React from "react";
import {Box} from "@mui/material";

export interface AppMainProps{
    charts: HTMLElement[]|null
}

export const AppMain:React.FC<AppMainProps> = ({charts}) => {
    return (
        <Box id={"chartBox"}
            display={"grid"}
        >
        </Box>
    )
}
