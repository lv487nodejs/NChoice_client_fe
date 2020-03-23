import React from 'react';
import { connect } from 'react-redux';

import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useStyles } from './Nav-bar-styles';
import { PAGE_TITLE } from '../../config';

import { setThemeMode, setDrawerStatus } from '../../actions';

const NavBar = ({ drawerStatus, darkMode, setThemeMode, setDrawerStatus }) => {
    const classes = useStyles();

    const themeChangeHandler = () => setThemeMode(!darkMode);

    const themeButton = darkMode ? <Brightness7Icon /> : <Brightness4Icon />;

    const handleDrawerToggle = () => {
        setDrawerStatus(!drawerStatus);
    };

    const menuToggle = (
        <IconButton onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
        </IconButton>
    );

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                {menuToggle}
                <Typography variant="h4" className={classes.title}>
                    {PAGE_TITLE}
                </Typography>
                <IconButton onClick={themeChangeHandler}>{themeButton}</IconButton>
                <AccountCircle />
            </Toolbar>
        </AppBar>
    );
};

const mapsStateToProps = ({ themeState: { darkMode, drawerStatus } }) => ({
    darkMode,
    drawerStatus,
});
const mapsDispatchToProps = { setThemeMode, setDrawerStatus };

export default connect(mapsStateToProps, mapsDispatchToProps)(NavBar);
