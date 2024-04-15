import ChartContainer from "./ChartContainer";
import {ChartListFactoryService} from "../services/ChartListFactory.service";
import {LightweightChartsApiService} from "../services/api/charts/LightweightChartsApi.service";

export const AppMainContainer = () =>{
    return (
        ChartContainer(
            new ChartListFactoryService(new LightweightChartsApiService()),
        )
    )
}
