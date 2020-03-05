const initialState = {
    user: {},
    loading: true,
    disableEdit: true,
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

        case 'USER_EDIT':
            return {
                ...state,
                disableEdit: !action.payload,
            };
        default:
            return state;
    }
};

export default userDetails;
