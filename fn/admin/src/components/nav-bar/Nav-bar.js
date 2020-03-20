import React from 'react';
import { connect } from 'react-redux';

import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useStyles } from './Nav-bar-styles';
import { PAGE_TITLE } from '../../config';

import { setThemeMode } from '../../actions';

const NavBar = ({ darkMode, setThemeMode }) => {
    const classes = useStyles();

    const themeChangeHandler = () => setThemeMode(!darkMode);

    const themeButton = darkMode ? (
        <Brightness7Icon />
    ) : (
        <Brightness4Icon />
    );

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    {PAGE_TITLE}
                </Typography>
                <IconButton onClick={themeChangeHandler}>{themeButton}</IconButton>
                <AccountCircle />
            </Toolbar>
        </AppBar>
    );
};

const mapsStateToProps = ({ themeState: { darkMode } }) => ({ darkMode });
const mapsDispatchToProps = { setThemeMode };

export default connect(mapsStateToProps, mapsDispatchToProps)(NavBar);
