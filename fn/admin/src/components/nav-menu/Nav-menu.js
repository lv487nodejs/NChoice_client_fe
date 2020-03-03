import React from 'react';

import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

import { useStyles } from './Styles.js';

import { MENU_CATEGORIES } from '../../config'

const NavMenu = () => {
    const classes = useStyles();

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
            <List>
                {MENU_CATEGORIES.map(text => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
};

export default NavMenu;
