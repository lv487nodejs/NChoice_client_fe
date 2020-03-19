const initialState = {
    open: false,
    message: '',
};

const snackbarState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SNACKBAR':
            return {
                open: true,
                message: action.payload,
            };

        default:
            return state;
    }
};

export default snackbarState;
