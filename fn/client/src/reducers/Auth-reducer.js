const initialState = {
    userTokens: {},
    userStatus: null,
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
                userTokens: action.payload,
                userStatus: 'received',
            }
        case 'ADD_USER_ERROR':
            return {
                ...state,
                userStatus: 'failed',
            }

        case 'LOGOUT_USER':
            return {...state,
                userTokens: {},
                userStatus: null
            }
        default:
            return {...state};
    }
}


export default authReducer;