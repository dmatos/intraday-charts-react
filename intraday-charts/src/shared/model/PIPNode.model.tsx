import {DataPoint} from "./DataPoint.model";

export interface PIPNode extends DataPoint {
    importance: number,
    index: number,
    distance: number
}
