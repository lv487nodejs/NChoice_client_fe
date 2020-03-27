const initialState = {
    userTokens: {},
    userStatus: null,
    popupShown: true
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_USER_REQUESTED':
            return {
                ...state,
                userStatus: 'loading',
            };
        case 'ADD_USER_RECEIVED':
            return {
                ...state,
                userTokens: action.payload.data,
                popupShown: false,
                popupText: action.payload.type,
                userStatus: 'received',
            }
        case 'ADD_USER_ERROR':
            return {
                ...state,
                popupShown: false,
                popupText: action.payload.type,
                userStatus: 'failed',
            }

        case 'LOGOUT_USER':
            return {...state,
                userStatus: null
            }
        case 'POPUP_SHOWN':
            return {
                ...state,
                popupShown: true
            }
        default:
            return {...state};
    }
}


export default authReducer;