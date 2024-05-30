const INITIAL_STATE = {
    logsAviso: [],
    stateReq: 0
}

export default function logsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGSAVISOS_FETCHED':
            return { ...state, logsAviso: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}