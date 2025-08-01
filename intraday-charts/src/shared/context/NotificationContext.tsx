import React, {createContext, ReactNode, useReducer} from "react";
import {AppAction} from "../model/App.model";

export const showErrorMessage = "showErrorMessage";
export const showSuccessMessage = "showSuccessMessage";
export const dismissNotification = "dismissNotification";


export interface NotificationProps{
    message: string,
    duration: number,
    open: boolean,
    verticalPosition: "bottom"|"top",
    horizontalPosition: "left"|"center"|"right"
    action: ReactNode | null | undefined
    severity: "success"|"warning"|"error"|"info"|undefined
    variant: "filled"
}

const notificationProps: NotificationProps = {
    message: "",
    duration: 3000,
    open: false,
    verticalPosition: "bottom",
    horizontalPosition: "center",
    action: null,
    severity: undefined,
    variant: "filled"
};

function notificationReducer(state: NotificationProps, action: AppAction): NotificationProps {
    console.debug(action);
    switch (action.type) {
        case showErrorMessage: {
            return {
                ...notificationProps,
                open: true,
                message: action.payload,
                severity: "error"

            }
        }
        case showSuccessMessage: {
            return {
                ...notificationProps,
                open: true,
                message: action.payload,
                severity: "success"
            }
        }
        case dismissNotification: {
            return {
                ...notificationProps,
                open: false
            }

        }
        default: {
            return {
                ...notificationProps
            }
        }
    }
}

export interface INotificationContext{
    notificationState: NotificationProps,
    notificationDispatch: React.Dispatch<AppAction>
}

export const NotificationContext = createContext({} as INotificationContext);

const NotificationProvider = ({children}:{children:React.ReactNode}) => {
    const [notificationState, notificationDispatch] = useReducer(notificationReducer, notificationProps);

    return (
        <NotificationContext.Provider value={{notificationState: notificationState, notificationDispatch: notificationDispatch}}>
            {children}
        </NotificationContext.Provider>
    )
}

export {NotificationProvider}
