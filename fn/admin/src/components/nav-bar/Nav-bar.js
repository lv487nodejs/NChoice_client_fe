import React from 'react';

import { Toolbar, AppBar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = () => (
    <AppBar>
        <Toolbar>
            <IconButton>
                <MenuIcon />
            </IconButton>
            <Typography>Admin Panel</Typography>
        </Toolbar>
    </AppBar>
);

export default NavBar;
