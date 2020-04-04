const initialState = {
    userTokens: {},
    userStatus: null,
    popupShown: true,
    user:{}
}

const authReducer = (state = initialState, action) => {    
    switch (action.type) {
        case 'ADD_USER_REQUESTED':
            return {
                ...state,
                userStatus: 'loading',
            };
        case 'ADD_USER_RECEIVED':
            return {
                ...state,
                ...action.payload,
                userStatus: 'received',
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                userStatus: 'received',
            }
        case 'ADD_USER_LOGIN_RECEIVED':
            return {
                ...state,
                userTokens: action.payload,
                userStatus: 'loginReceived',
            }
        case 'ADD_USER_ERROR':
            return {
                ...state,
                userStatus: 'failed',
            }

        case 'LOGOUT_USER':
            return {
                ...state,
                userStatus: null
            }
        default:
            return { ...state };
    }
}


export default authReducer;