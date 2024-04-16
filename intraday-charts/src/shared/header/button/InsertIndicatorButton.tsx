import {IButtonCallbackFn} from "./IButtonCallbackFn";
import {Button} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";

function InsertIndicatorButton(executeButtonData: Readonly<IButtonCallbackFn>) {
    return (
        <Button
            variant="contained"
            color={"primary"}
            onClick={executeButtonData.callbackFn}
        >
            <LibraryAdd/>
        </Button>
    )
}

export default InsertIndicatorButton;
