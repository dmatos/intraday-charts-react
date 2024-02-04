import {AppMain, AppMainProps} from "./AppMain";
import {createChart, UTCTimestamp} from "lightweight-charts";

export const AppMainContainer = () =>{

    const setupMockChart = () => {
        let chartBox = document.getElementById("chartBox");
        if(!!chartBox){
            const chart = createChart(chartBox, { width: 400, height: 300,
                localization: {
                    timeFormatter: (timestamp:UTCTimestamp) => {
                        return new Date(timestamp * 1000).toISOString();
                    },
                },
            });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData([
                { time: 1554967140 as UTCTimestamp, value: 80.01 },
                { time: 1554967200 as UTCTimestamp, value: 80.02 },
                { time: 1554967260 as UTCTimestamp, value: 80.03 }
            ]);
            chart.timeScale().fitContent();
        }

    }


    let appMainProps:AppMainProps = {
        charts: []
    };

    setupMockChart();

    return (
        <AppMain {...appMainProps}/>
    )
}
