import {IChartAPIAdapter} from "../../IChartAPIAdapter.service";
import {Chart} from "../../../model/Chart.model";
import {createChart, IChartApi, Range, UTCTimestamp} from "lightweight-charts";
import {IndicatorType} from "../../../model/IndicatorType.enum";
import {Candle} from "../../../model/Candle.model";
import {DataPoint} from "../../../model/response/DataPoint.model";
import {MacdResponse} from "../../../model/response/MacdResponse.model";
import {RSIResponse} from "../../../model/response/RSIResponse.model";
import {MovingAverageResponse} from "../../../model/response/MovingAverageResponse.model";

export class LightweightChartsApiService implements IChartAPIAdapter{

    options = {};
    mainChart: IChartApi = {} as IChartApi;
    charts2Sync: Map<string, IChartApi> = new Map<string, IChartApi>();

    constructor(options:any) {
        this.options = options;
    }

    syncVisibleCharts = () =>{
        try {
            if (this.charts2Sync.size > 0) {
                this.charts2Sync.forEach((chartApi) => {
                    chartApi.timeScale().subscribeVisibleLogicalRangeChange((timeRange: Range<number> | null) => {
                        if (timeRange) {
                            this.mainChart.timeScale().setVisibleLogicalRange(timeRange);
                        }
                    });
                    this.mainChart.timeScale().subscribeVisibleLogicalRangeChange((timeRange: Range<number> | null) => {
                        if (timeRange) {
                            chartApi.timeScale().setVisibleLogicalRange(timeRange);
                        }
                    });
                })
            }
        }catch(e){
            let message = "";
            if (typeof e === "string") {
                message = e.toUpperCase()
            } else if (e instanceof Error) {
                message = e.message
            }
            console.error(message);
        }
    }

    newChartApiInstance = (key: string, chartBox:HTMLElement) =>{
        const chartApi = createChart(chartBox,
            {
                ...this.options,
                localization: {
                    timeFormatter: (timestamp:UTCTimestamp) => {
                        return new Date(timestamp * 1000).toISOString();
                    },
                },
            });
        this.charts2Sync.set(key, chartApi);
        return chartApi;
    }

    execute = (chartBox:HTMLElement|null, chart:Chart) => {
        if(!!chartBox && chart && chart.indicator && chart.indicator.data){
            const chartApi = this.newChartApiInstance(IndicatorType[chart.indicator.type], chartBox);
            this.setupSeries(chartApi, chart.indicator?.type, chart.indicator?.data);
            chart.auxIndicators?.forEach(indicator => {
                this.setupSeries(chartApi, indicator.type, indicator.data);
            });
            chartApi.timeScale().fitContent();
        }
        this.syncVisibleCharts();
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

    setupDataPointData = (data: DataPoint[]) =>{
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

    setupHistogramSeries = (chartApi: IChartApi, data: Candle[]) => {
        if(data) {
            const volumeSeries = chartApi.addHistogramSeries();
            volumeSeries.setData(this.setupDataPointData(
                data.map(d => {
                    return {
                        ...d,
                        value: d.volume
                    } as DataPoint
                })
            ));
        }
    }

    setupMACD = (chartApi: IChartApi, macdResponse: MacdResponse) => {
        if(macdResponse){
            const macdHistogram = chartApi.addHistogramSeries({color: 'white'});
            const macdSeries = chartApi.addLineSeries({color: 'green', lineWidth: 2});
            const signalSeries = chartApi.addLineSeries({color: 'yellow', lineWidth: 2});
            macdSeries.setData(this.setupDataPointData(macdResponse.macd));
            signalSeries.setData(this.setupDataPointData(macdResponse.signal));
            macdHistogram.setData(this.setupDataPointData(macdResponse.histogram));
        }
    }

    setupRSI = (chartApi: IChartApi, response: RSIResponse) => {
        if(response){
            const rsiLine = chartApi.addLineSeries({color: "white", lineWidth: 2})
            rsiLine.setData(this.setupDataPointData(response.rsiValuesList));
        }
    }

    setupEMA = (chartApi: IChartApi, response: MovingAverageResponse) => {
        if(response){
            const emaLine = chartApi.addLineSeries({color: "white", lineWidth: 1})
            emaLine.setData(this.setupDataPointData(response.movingAverages));
        }
    }

    setupCandlestickSeries = (chartApi: IChartApi, data: Candle[]) => {
        this.mainChart = chartApi;
        const series = chartApi.addCandlestickSeries();
        series.setData(this.setupCandlestickData(data));
    }

    setupSeries = (chartApi: IChartApi, type: IndicatorType, data: unknown) => {
        switch (type) {
            case IndicatorType.Candlestick: {
                this.setupCandlestickSeries(chartApi, data as Candle[]);
                break;
            }
            case IndicatorType.Volume: {
                this.setupHistogramSeries(chartApi, data as Candle[]);
                break;
            }
            case IndicatorType.MACD: {
                this.setupMACD(chartApi, data as MacdResponse);
                break;
            }
            case IndicatorType.RSI:
                this.setupRSI(chartApi, data as RSIResponse);
                break;
            case IndicatorType.EMA:
                this.setupEMA(chartApi, data as MovingAverageResponse);
                break;
            default: {
                console.debug("Work to be done...");
            }
        }
    }
}
