import {IndicatorData} from "./IndicatorData.model";
import {ChartConfig} from "./ChartConfig.model";
import {ChartBoxProps} from "./ChartBoxProps.model";

export interface Chart {
    id: string,
    title: string,
    indicator: IndicatorData,
    auxIndicators: IndicatorData[],
    config: ChartConfig|undefined,
    chartBoxProps: ChartBoxProps|undefined
}
