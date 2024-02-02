export interface AppState {
    selectedStockExchange: string,
    selectedTicker: string,
    selectedDate: string
}

export interface AppAction {
    type: string,
    payload: string
}
