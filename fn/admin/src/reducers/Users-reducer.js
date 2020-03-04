const initialState = {
    users: [],
    loading: true,
};

const usersList = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_REQUESTED':
            return {
                ...state,
                loading: true,
            };

        case 'USERS_LOADED':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default usersList;
