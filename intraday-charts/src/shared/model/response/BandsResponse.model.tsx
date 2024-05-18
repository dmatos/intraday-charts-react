import {DataPoint} from "./DataPoint.model";

export interface BandsResponse{
    means: DataPoint[]
    firstUp: number[]
    secondUp: number[]
    thirdUp: number[]
    firstDown: number[]
    secondDown: number[]
    thirdDown: number[]
}
