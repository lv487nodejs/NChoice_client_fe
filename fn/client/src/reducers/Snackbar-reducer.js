const initialState = {
    snackbarStatus: false,
    snackbarText: '',
    snackbarDuration: null
}
const snackbarReducer = (state = initialState, action) => {    
    switch (action.type) {
        case 'SET_SNACKBAR_STATUS':
            return {
                ...state,
                snackbarStatus: action.payload,
            }
        case 'SET_SNACKBAR_TEXT':
            return {
                ...state,
                snackbarText: action.payload,
            }
        case 'SET_SNACKBAR_DURATION':
            return {
                ...state,
                snackbarDuration: action.payload
            }
            default:
            return state;
    }
}
export default snackbarReducer