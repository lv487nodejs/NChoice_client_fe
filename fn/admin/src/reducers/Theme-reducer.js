import { indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        warning: {
            main: '#ffb74d',
        },
        secondary: {
            main: '#e57373',
        },
        primary: indigo,
        type: 'dark',
    },
});

const initialState = {
    theme,
};

const themeState = (state = initialState, action) => {
    switch (action.type) {
        case 'THEME_DARK':
            return {
                theme: {
                    palette: {
                        warning: {
                            main: '#ffb74d',
                        },
                        secondary: {
                            main: '#e57373',
                        },
                        primary: indigo,
                        type: 'dark',
                    },
                },
            };
        case 'THEME_LIGHT':
            return {
                theme: {
                    palette: {
                        warning: {
                            main: '#ffb74d',
                        },
                        secondary: {
                            main: '#e57373',
                        },
                        primary: indigo,
                        type: 'light',
                    },
                },
            };

        default:
            return state;
    }
};

export default themeState;
