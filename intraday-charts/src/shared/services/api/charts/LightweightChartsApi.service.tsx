import {IChartAPIAdapter} from "../../IChartAPIAdapter.service";
import {Chart} from "../../../model/Chart.model";
import {createChart, IChartApi, UTCTimestamp} from "lightweight-charts";
import {IndicatorType} from "../../../model/IndicatorType.enum";
import {Candle} from "../../../model/Candle.model";
import {DataPoint} from "../../../model/response/DataPoint.model";
import {MacdResponse} from "../../../model/response/MacdResponse.model";

export class LightweightChartsApiService implements IChartAPIAdapter{

    options = {};

    constructor(options:any) {
        this.options = options;
    }

    execute = (chartBox:HTMLElement|null, chart:Chart) => {
        if(!!chartBox && chart && chart.indicator && chart.indicator.data){
            let chartApi = createChart(chartBox,
                {
                    ...this.options,
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
        if(data) {
            return data.map(d => {
                return {
                    ...d,
                    time: d.timestampInUTCSeconds as UTCTimestamp,
                }
            });
        }
        return [];
    }

    setupLinesData = (data: DataPoint[]) =>{
        if(data){
            return data.map( (d: DataPoint) => {
               return {
                   ...d,
                   time: d.timestampInUTCSeconds as UTCTimestamp,
               }
            });
        }
        return [];
    }

    setupSeries = (chartApi: IChartApi, type: IndicatorType, data: unknown) => {
        switch (type) {
            case IndicatorType.Candlestick: {
                const series = chartApi.addCandlestickSeries();
                series.setData(this.setupCandlestickData(data as Candle[]));
                break;
            }
            case IndicatorType.MACD: {
                const macdSeries = chartApi.addLineSeries({color: 'white'});
                const signalSeries = chartApi.addLineSeries({color: 'yellow'});
                const macdResponse = data as MacdResponse;
                if(macdResponse){
                    macdSeries.setData(this.setupLinesData(macdResponse.macd));
                    signalSeries.setData(this.setupLinesData(macdResponse.signal));
                }
                break;
            }
            case IndicatorType.RSI:
                console.debug("Work to be done...");
                break;
            default: {
                return chartApi.addLineSeries();
            }
        }
    }
}
