import {EMAConfigKeys, MACDConfigKeys, RSIConfigKeys} from "./ConfigKeys.model";
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
    min: 1,
    max: 100
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SlowSignalKey], {
    key: MACDConfigKeys[MACDConfigKeys.SlowSignalKey],
    description: "MACD slow line",
    value: 15,
    min: 1,
    max: 100
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalKey], {
    key: MACDConfigKeys[MACDConfigKeys.SignalKey],
    description: "MACD signal line",
    value: 5,
    min: 1,
    max: 100
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalDelayKey], {
    key: MACDConfigKeys[MACDConfigKeys.SignalDelayKey],
    description: "MACD signal delay",
    value: 3,
    min: 0,
    max: 10
})

Configs.set(EMAConfigKeys[EMAConfigKeys.SignalDelayKey], {
    key: EMAConfigKeys[EMAConfigKeys.SignalDelayKey],
    description: "EMA signal delay",
    value: 5,
    min: 0,
    max: 10
})

Configs.set(EMAConfigKeys[EMAConfigKeys.SignalKey], {
    key: EMAConfigKeys[EMAConfigKeys.SignalKey],
    description: "EMA signal line",
    value: 10,
    min: 1,
    max: 100
})

Configs.set(RSIConfigKeys[RSIConfigKeys.NumberOfCandles], {
    key: RSIConfigKeys[RSIConfigKeys.NumberOfCandles],
    description: "Number of candles as periodo",
    value: 14,
    min: 1,
    max: 100
})

export function getConfigsByIndicator(indicatorType: IndicatorType){
    switch (indicatorType) {
        case IndicatorType.MACD:
            return [
                Configs.get(MACDConfigKeys[MACDConfigKeys.FastSignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SlowSignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SignalKey]),
                Configs.get(MACDConfigKeys[MACDConfigKeys.SignalDelayKey])
            ]
        case IndicatorType.RSI:
            return [Configs.get(RSIConfigKeys[RSIConfigKeys.NumberOfCandles])]
        case IndicatorType.EMA:
            return [
                Configs.get(EMAConfigKeys[EMAConfigKeys.SignalKey]),
                Configs.get(EMAConfigKeys[EMAConfigKeys.SignalDelayKey])
            ]
        default:
            return [];
    }
}

export function getConfigurableIndicators(): IndicatorType[]{
    return [
        IndicatorType.MACD,
        IndicatorType.RSI,
        IndicatorType.EMA
    ];
}

export default Configs;
