import React from 'react';

import { Toolbar, AppBar, Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useStyles } from './Styles';
import { PAGE_TITLE } from '../../config';

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography>{PAGE_TITLE}</Typography>
                <AccountBoxIcon />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
