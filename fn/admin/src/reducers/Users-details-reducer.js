const initialState = {
    user: {},
    loading: true,
};

const userDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REQUESTED':
            return {
                ...state,
                loading: true,
            };

        case 'USER_LOADED':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default userDetails;
