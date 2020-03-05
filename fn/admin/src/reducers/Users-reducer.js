const initialState = {
    users: [],
    user: {},
    disableEdit: true,
    loading: true,
};

const usersList = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_REQUESTED':
            return {
                ...state,
                loading: true,
                disableEdit: true,
            };

        case 'USERS_LOADED':
            return {
                ...state,
                users: action.payload,
                loading: false,
                disableEdit: true,
            };
        case 'USER_REQUESTED':
            return {
                ...state,
                loading: true,
                disableEdit: true,
            };

        case 'USER_LOADED':
            return {
                ...state,
                user: action.payload,
                loading: false,
                disableEdit: true,
            };

        case 'USER_EDIT':
            return {
                ...state,
                disableEdit: !action.payload,
            };
        case 'USER_SAVE':
            return {
                ...state,
                user: action.payload,
            };

        case 'USER_SET_ROLE':
            return {
                ...state,
                user: {
                    role: action.payload,
                },
            };
        default:
            return state;
    }
};

export default usersList;
