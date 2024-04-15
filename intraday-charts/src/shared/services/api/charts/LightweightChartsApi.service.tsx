import {IChartAPIAdapter} from "../../IChartAPIAdapter.service";
import {Chart} from "../../../model/Chart.model";
import {createChart, IChartApi, UTCTimestamp} from "lightweight-charts";
import {IndicatorType} from "../../../model/IndicatorType.enum";
import {Candle} from "../../../model/Candle.model";

export class LightweightChartsApiService implements IChartAPIAdapter{

    execute = (chartBox:HTMLElement|null, chart:Chart) => {
        console.debug("LightweightChartsApiService");
        if(!!chartBox){
            let chartApi = createChart(chartBox,
                {
                    localization: {
                        timeFormatter: (timestamp:UTCTimestamp) => {
                            return new Date(timestamp * 1000).toISOString();
                        },
                    },
                });
            this.setupSeries(chartApi, chart.indicator?.type, chart.indicator?.data);
            chart.auxIndicators?.forEach(indicator => {
                this.setupSeries(chartApi, indicator.type, indicator.data);
            });
            chartApi.timeScale().fitContent();
        }
    }

    setupCandlestickData = (data: Candle[]) => {
        return data.map(d => {
            return {
                ...d,
                time: d.timestampInUTCSeconds as UTCTimestamp,
            }
        });
    }

    setupSeries = (chartApi: IChartApi, type: IndicatorType, data: any[]) => {
        switch (type){
            case IndicatorType.Candlestick: {
                const series = chartApi.addCandlestickSeries();
                series.setData(this.setupCandlestickData(data));
                break;
            }
            default: {
                return chartApi.addLineSeries();
            }
        }
    }
}
