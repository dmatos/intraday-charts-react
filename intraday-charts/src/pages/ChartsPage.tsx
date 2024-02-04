import {LayouBaseChartsPage} from "../shared/layouts/LayoutBaseChartsPage";
import AppHeaderContainer from "../shared/header/AppHeaderContainer";
import {Box, useTheme} from "@mui/material";
import {ReactNode} from "react";
import {AppMainContainer} from "../shared/main/AppMainContainer";

const PlaceholderComponent = () => {
    const theme = useTheme();
    return(
        <Box border={"1px solid"} display={"grid"} height={"50vh"} bgcolor={theme.palette.background.default} alignContent={"center"}>
        </Box>
    )
}
export const ChartsPage:React.FC<{children:ReactNode}> = ({children})=>{
    return (
        <LayouBaseChartsPage  header={AppHeaderContainer()} main={AppMainContainer()} footer={PlaceholderComponent()}>
            {children}
        </LayouBaseChartsPage>
    )
}
