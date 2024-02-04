import React, {ReactNode} from "react";
import {Box, useTheme} from "@mui/material";

interface ILayouBaseChartsPageProps{
    header: ReactNode,
    main: ReactNode,
    footer: ReactNode,
    children: ReactNode|undefined
}

export const LayouBaseChartsPage:React.FC<ILayouBaseChartsPageProps> = ({header, main, footer}:ILayouBaseChartsPageProps) => {

    const theme = useTheme();

    return (
        <Box
            height={"100vh"}
            overflow={"hidden"}
            bgcolor={theme.palette.background.default}>
            {header}
            {main}
            {footer}
        </Box>
    )
};
