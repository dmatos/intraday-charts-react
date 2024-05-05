import {DataPoint} from "./DataPoint.model";

export interface MacdResponse{
    macd: DataPoint[],
    signal: DataPoint[]
}
