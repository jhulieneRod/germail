const INITIAL_STATE = {
    list: [],
    stateReq: 0
}

export default function destinatarioEmailReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'DESTINATARIO_EMAIL_FETCHED':
            return { ...state, list: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}