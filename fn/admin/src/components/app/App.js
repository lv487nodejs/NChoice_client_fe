import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import { useStyles } from './App-styles';
import AppRouter from '../app-router';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppRouter />
            </div>
        </ThemeProvider>
    );
};

export default App;
