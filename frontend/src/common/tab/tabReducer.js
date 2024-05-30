const INITIAL_STATE = { selected: '', visible: {}, selectedOBJ: {}, showOBJ: {} }

export default function TabReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case 'TAB_SELECTED_USU':
        //     return { ...state, selected: action.payload }
        case 'TAB_SELECTED_OBJ':
            return { ...state, selectedOBJ: action.payload }
        case 'TAB_SHOW_OBJ':
            return { ...state, showOBJ: action.payload }
        case 'TAB_SHOWED':
            return { ...state, visible: action.payload }
        default:
            return state
    }
}