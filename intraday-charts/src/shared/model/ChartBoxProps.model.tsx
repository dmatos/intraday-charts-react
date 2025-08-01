import {Chart} from "./Chart.model";

export interface ChartBoxProps {
    callbackFn: (ref:HTMLElement|null, chart: Chart|null) => void,
    width: number,
    height: number,
    id: string
}
