import {AppMain, AppMainProps} from "./AppMain";
import {createChart, UTCTimestamp} from "lightweight-charts";
import React, {useCallback, useEffect, useState} from "react";

export const AppMainContainer = () =>{
    const [data, setData] = useState(
        [
            { time: 1554967140 as UTCTimestamp, value: 80.01 },
            { time: 1554967200 as UTCTimestamp, value: 80.02 },
            { time: 1554967260 as UTCTimestamp, value: 80.03 }
        ]
    )

    const setupMockChart = useCallback( (chartBox:HTMLElement|null) => {
        if(!!chartBox){
            let chart = createChart(chartBox,
                {
                    localization: {
                        timeFormatter: (timestamp:UTCTimestamp) => {
                            return new Date(timestamp * 1000).toISOString();
                        },
                    },
                });
            const lineSeries = chart.addLineSeries();
            lineSeries.setData(data);
            chart.timeScale().fitContent();
        }
    }, [data]);

    const getAppMainProps = (): AppMainProps => {
        return {
            callbackFn: setupMockChart,
            width: window.innerWidth,
            height: Math.floor(window.innerHeight  * 90 / 100)
        }
    }

    const [appMainProps, setAppMainProps] = useState<AppMainProps>(getAppMainProps());

    const windowResizeListener = () => {
       setAppMainProps(getAppMainProps());
    }

    useEffect( () => {
        window.addEventListener('resize', windowResizeListener, false);
        return () => {
            window.removeEventListener('resize', windowResizeListener, false);
        }
    },[]);

    return (
        <AppMain {...appMainProps}/>
    )
}
