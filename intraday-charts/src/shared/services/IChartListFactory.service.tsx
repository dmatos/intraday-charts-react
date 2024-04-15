import {Chart} from "../model/Chart.model";
import {IndicatorData} from "../model/IndicatorData.model";

export interface Charts{
    mainChart: Chart,
    chartList: Chart[]
}

export interface IChartListFactory{
    getChartList: (indicatorData: IndicatorData[],
                   ticker: string) => Charts
}
