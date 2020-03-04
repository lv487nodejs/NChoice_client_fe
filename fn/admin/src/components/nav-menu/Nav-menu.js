import React from 'react';
import { Link } from 'react-router-dom';

import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

import { useStyles } from './Nav-menu-styles';

import { MENU_CATEGORIES } from '../../config';

const NavMenu = () => {
    const classes = useStyles();

    const menuItems = MENU_CATEGORIES.map(category => {
        const pathText = category[0];
        const pathTo = category[1];

        return (
            <ListItem button key={pathText} component={Link} to={pathTo}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={pathText} />
            </ListItem>
        );
    });

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>{menuItems}</List>
            <Divider />
        </Drawer>
    );
};

export default NavMenu;
