import {Button, Icon} from "@mui/material";

export interface ExecuteButtonData {
    callBackFn: () => void
}

function ExecuteButton(executeButtonData:ExecuteButtonData){
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

export default ExecuteButton;
