const INITIAL_STATE = {
    list: [],
    stateReq: 0
}

export default function leadReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LEAD_FETCHED':
            return { ...state, list: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}