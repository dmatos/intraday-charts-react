import {Button} from "@mui/material";
import {TrendingUp} from "@mui/icons-material";
import {IButtonCallbackFn} from "./IButtonCallbackFn";

function RenderChartsButton(executeButtonData: Readonly<IButtonCallbackFn>){
    return (
        <Button
            variant="contained"
            color={"primary"}
            onClick={executeButtonData.callbackFn}
        >
            <TrendingUp/>
        </Button>
    )
}

export default RenderChartsButton;
