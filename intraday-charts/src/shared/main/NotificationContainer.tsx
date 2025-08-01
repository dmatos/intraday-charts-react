import {Alert, Snackbar} from "@mui/material";
import React, {useContext} from "react";
import {dismissNotification, NotificationContext} from "../context/NotificationContext";


export default function NotificationContainer(){

    const notificationContext = useContext(NotificationContext);

    const handleClose = () => {
        notificationContext.notificationDispatch({
            type: dismissNotification,
            payload: ""
        })
    }

    return (
        <NotificationContext.Consumer>
            {({notificationState}) => (
            <Snackbar
                anchorOrigin={{
                    vertical: notificationState.verticalPosition,
                    horizontal: notificationState.horizontalPosition
                }}
                autoHideDuration = {notificationState.duration}
                onClose= {handleClose}
                open  =  {notificationState.open}
                action = {notificationState.action}>
                <Alert
                    severity={notificationState.severity}
                    variant={notificationState.variant}>
                    {notificationState.message}
                </Alert>
            </Snackbar>
            )}
        </NotificationContext.Consumer>
    )
}
