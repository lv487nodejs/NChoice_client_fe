import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { connect } from 'react-redux';
import { useStyles } from './App-styles';
import AppRouter from '../app-router';

import { darkTheme, lightTheme } from './App-theme';

const App = ({ darkMode }) => {
    const themeValue = darkMode ? darkTheme : lightTheme;

    const classes = useStyles();

    return (
        <ThemeProvider theme={themeValue}>
            <CssBaseline />
            <div className={classes.root}>
                <AppRouter />
            </div>
        </ThemeProvider>
    );
};

const mapsStateToProps = ({ themeState: { darkMode } }) => ({ darkMode });

export default connect(mapsStateToProps)(App);
