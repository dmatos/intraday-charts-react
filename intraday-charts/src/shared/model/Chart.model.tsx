import {IndicatorData} from "./IndicatorData.model";
import {ChartBoxProps} from "./ChartBoxProps.model";

export interface Chart {
    id: string,
    title: string,
    indicator: IndicatorData,
    auxIndicators: IndicatorData[],
    chartBoxProps: ChartBoxProps|undefined
}
