const INITIAL_STATE = {
    list: [], 
    stateReq: 0
}

export default function processoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PROCESSO_FETCHED':
            return { ...state, list: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}