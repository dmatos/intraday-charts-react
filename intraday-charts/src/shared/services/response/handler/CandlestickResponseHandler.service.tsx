import {IResponseHandlerService} from "./IResponseHandler.service";
import {NotificationContext, showErrorMessage, showSuccessMessage} from "../../../context/NotificationContext";
import {useContext} from "react";
import {IndicatorType} from "../../../model/IndicatorType.enum";
import {IndicatorContext, upsertMainIndicator} from "../../../context/IndicatorContext";

export class CandlestickResponseHandlerService implements IResponseHandlerService {

        notificationContext = useContext(NotificationContext);
        indicatorContext = useContext(IndicatorContext);

        handleResponse = async (promise: Promise<any>) => {
            promise.then((response) => {
                console.debug(response);
                this.indicatorContext.indicatorDispatch({
                    type: upsertMainIndicator,
                    payload: {
                        data: response,
                        type: IndicatorType.Candlestick
                    }
                });
                this.notificationContext.notificationDispatch({
                    type: showSuccessMessage,
                    payload: ``
                });
            }).catch((error) => {
                console.debug(error);
                this.notificationContext.notificationDispatch({
                    type: showErrorMessage,
                    payload: error.status
                })
            });

        }
}
