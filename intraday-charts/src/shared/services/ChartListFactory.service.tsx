import {Chart} from "../model/Chart.model";
import {IChartListFactory} from "./IChartListFactory.service";
import {IndicatorType} from "../model/IndicatorType.enum";
import {IndicatorData} from "../model/IndicatorData.model";
import {ChartBoxProps} from "../model/ChartBoxProps.model";
import {useCallback} from "react";
import {IChartAPIAdapter} from "./IChartAPIAdapter.service";

export class ChartListFactoryService implements IChartListFactory{

    chartsAPIAdapter= {} as IChartAPIAdapter;

    constructor(chartsAPIAdapter: IChartAPIAdapter) {
        this.chartsAPIAdapter = chartsAPIAdapter;
    }
    getChartList = (indicatorData: IndicatorData[], ticker: string) => {
        const chartList: Chart[] = [];

        const mainIndicators = indicatorData.filter(x => this.isMainComplaint(x?.type));
        const listIndicators = indicatorData.filter(x => !this.isMainComplaint(x?.type));

        const mainChart = this.getChart(mainIndicators[0], `${mainIndicators[0]?.type}0`, ticker);
        if(mainIndicators.length > 1){
            mainChart.auxIndicators = [...mainChart.auxIndicators, ...mainIndicators.slice(1)];
        }
        listIndicators.forEach(
            (item, index) => {
                if(item.data){
                    chartList.push(this.getChart(item, `${item.type}${index}`, ticker))
                }
            }
        );
        return {
            mainChart,
            chartList
        };
    }

    setupChart = useCallback( (chartBox:HTMLElement|null, chart: Chart|null) => {
        if(!!chartBox && !!chart){
            this.chartsAPIAdapter.execute(chartBox, chart);
        }
    }, [this.chartsAPIAdapter]);

    getChart(indicator: IndicatorData, id: string, ticker: string){
        return {
            id: id,
            indicator:indicator,
            auxIndicators: [] as IndicatorData[],
            chartBoxProps: this.getChartBoxConfigs(id, indicator?.type),
            title: `${ticker} ${indicator?.type}`
        };
    }

    getChartBoxConfigs = (id: string, type: IndicatorType): ChartBoxProps => {
        let height: number;
        switch (type){
            case IndicatorType.Candlestick:
                height =  window.innerHeight * 35 / 100;
                break;
            case IndicatorType.MACD:
            case IndicatorType.RSI:
                height = window.innerHeight * 20 / 100;
                break;
            default: height = window.innerHeight * 10 / 100;
        }
        return {
            callbackFn: this.setupChart,
            width: window.innerWidth,
            height: Math.floor(height),
            id: id
        }
    }

    isMainComplaint = (type: IndicatorType) =>{
        const mainCompliantArray =
            [
                IndicatorType.Candlestick,
                IndicatorType.Bands,
                IndicatorType.EMA
            ];

        return mainCompliantArray.includes(type);
    }
}
