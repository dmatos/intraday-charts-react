import {MACDConfigKeys} from "./MacdConfigs.model";
import {IndicatorType} from "../IndicatorType.enum";


export interface ConfigItem{
    key: string,
    description: string,
    value: number,
    min: number,
    max: number
}

const Configs = new Map<string, ConfigItem>();

Configs.set(MACDConfigKeys[MACDConfigKeys.FastSignalKey], {
    key: MACDConfigKeys[MACDConfigKeys.FastSignalKey],
    description: "MACD fast line",
    value: 4,
    min: 4,
    max: 30
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SlowSignalKey], {
    key: MACDConfigKeys[MACDConfigKeys.SlowSignalKey],
    description: "MACD slow line",
    value: 15,
    min: 4,
    max: 30
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalKey], {
    key: MACDConfigKeys[MACDConfigKeys.SignalKey],
    description: "MACD signal line",
    value: 5,
    min: 4,
    max: 30
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalDelay], {
    key: MACDConfigKeys[MACDConfigKeys.SignalDelay],
    description: "MACD signal delay",
    value: 3,
    min: 2,
    max: 10
})

export function getConfigsByIndicator(indicatorType: IndicatorType){
    switch (indicatorType) {
        case IndicatorType.MACD:
            return [
                Configs.get(MACDConfigKeys[MACDConfigKeys.FastSignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SlowSignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SignalDelay])
            ]
        case IndicatorType.RSI:
        default:
            return [];
    }
}

export default Configs;
