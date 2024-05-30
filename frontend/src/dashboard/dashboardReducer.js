const INITIAL_STATE = {
    chartAviso: [],
    widget: [],
    widgetPesquisar: [],
    stateReq : 0
}

export default function dashboardReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CHARTAVISOS_FETCHED':
            return { ...state, chartAviso: action.payload.data, stateReq: action.payload.status }
        case 'WIDGETS_FETCHED':
            return { ...state, widget: action.payload.data, stateReq: action.payload.status }
        case 'WIDGETS_PESQUISAR_FETCHED':
            return { ...state, widgetPesquisar: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}