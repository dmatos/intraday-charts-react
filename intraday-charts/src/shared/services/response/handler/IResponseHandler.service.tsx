import {INotificationContext} from "../../../context/NotificationContext";

export interface IResponseHandlerService {
    notificationContext: INotificationContext,
    handleResponse: (promise: Promise<any>) => void
}
