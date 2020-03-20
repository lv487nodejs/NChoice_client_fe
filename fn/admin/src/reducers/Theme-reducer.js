const initialState = {
    darkMode: true,
};

const themeState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME_MODE':
            return {
                darkMode: action.payload,
            };

        default:
            return state;
    }
};

export default themeState;
