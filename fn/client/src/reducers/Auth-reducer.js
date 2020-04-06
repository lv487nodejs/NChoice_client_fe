const initialState = {
    userLogged: false,
    userLoading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_LOGGED':
            return {
                userLoading: false,
                userLogged: action.payload,
            };
        case 'SET_USER_LOADING':
            return {
                ...state,
                userLoading: true,
            }
        default:
            return { ...state };
    }
}


export default authReducer;