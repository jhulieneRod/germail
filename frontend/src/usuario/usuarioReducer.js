const INITIAL_STATE = {
    list: [],
    listTela: [],
    stateReq: 0
}

export default function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'USUARIO_FETCHED':
            return { ...state, list: action.payload.data, stateReq: action.payload.status }
        case 'USUARIOTELA_FETCHED':
            return { ...state, listTela: action.payload.data, stateReq: action.payload.status }
        default:
            return state
    }
}