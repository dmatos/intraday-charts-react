export interface AppState {
    selectedStockExchange: string,
    selectedTicker: string,
    startDate: string,
    endDate: string
    timeframe: number
}

export interface AppAction {
    type: string,
    payload: string
}
