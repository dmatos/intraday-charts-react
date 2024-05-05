import {MACDConfigKeys} from "./MacdConfigs.model";


export interface ConfigItem{
    description: string,
    value: number
}

const Configs = new Map<string, ConfigItem>();

Configs.set(MACDConfigKeys[MACDConfigKeys.FastSignalKey], {
    description: "MACD fast line",
    value: 10
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SlowSignalKey], {
    description: "MACD slow line",
    value: 30
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalKey], {
    description: "MACD signal line",
    value: 15
})

Configs.set(MACDConfigKeys[MACDConfigKeys.SignalDelay], {
    description: "MACD signal delay",
    value: 5
})

export default Configs;
