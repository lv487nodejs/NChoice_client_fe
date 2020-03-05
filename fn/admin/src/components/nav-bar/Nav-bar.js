import React from 'react';

import { Toolbar, AppBar, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useStyles } from './Nav-bar-styles';
import { PAGE_TITLE } from '../../config';

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    {PAGE_TITLE}
                </Typography>
                <AccountCircle />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
