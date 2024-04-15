import {Chart} from "../model/Chart.model";

export interface IChartAPIAdapter{
    execute: (chartBox:HTMLElement, chart: Chart) => void
}
