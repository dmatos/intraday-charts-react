import {Button, Icon} from "@mui/material";

export interface RenderChartsButtonData {
    callBackFn: () => void
}

function RenderChartsButton(executeButtonData: Readonly<RenderChartsButtonData>){
    return (
        <Button
            variant="contained"
            color={"primary"}
            onClick={executeButtonData.callBackFn}
        >
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <Icon>trending_up</Icon>
        </Button>
    )
}

export default RenderChartsButton;
