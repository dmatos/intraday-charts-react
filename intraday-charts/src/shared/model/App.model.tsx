export interface AppState {
    selectedStockExchange: string,
    selectedTicker: string,
    startDate: string,
    endDate: string
}

export interface AppAction {
    type: string,
    payload: string
}
