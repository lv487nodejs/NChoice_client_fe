import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

export const darkTheme = createMuiTheme({
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

export const lightTheme = createMuiTheme({
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
});