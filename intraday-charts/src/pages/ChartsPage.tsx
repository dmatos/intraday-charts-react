import {LayouBaseChartsPage} from "../shared/layouts/LayoutBaseChartsPage";
import AppHeaderContainer from "../shared/header/AppHeaderContainer";
import {Box, useTheme} from "@mui/material";

const PlaceholderComponent = () => {
    const theme = useTheme();
    return(
        <Box border={"1px solid"} display={"grid"} height={"50vh"} bgcolor={theme.palette.background.default} alignContent={"center"}>
        </Box>
    )
}
export const ChartsPage:React.FC = ()=>{
    return (
        <LayouBaseChartsPage header={AppHeaderContainer()} main={PlaceholderComponent()} footer={PlaceholderComponent()}>
        </LayouBaseChartsPage>
    )
}
