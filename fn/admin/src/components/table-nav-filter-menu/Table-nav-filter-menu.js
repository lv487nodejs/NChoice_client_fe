import React from 'react';

import { Menu, FormGroup } from '@material-ui/core';

import { PRODUCT_OPTION_NAMES } from '../../config';

const menuAnchorPosition = {
    vertical: 'bottom',
    horizontal: 'center',
};

const menuTransformPosition = {
    vertical: 'top',
    horizontal: 'center',
};

const filterNames = PRODUCT_OPTION_NAMES;

const TableNavFilterMenu = ({ handleMenuClose, filterCheckboxes, menuStatus }) => {
    const filterMenus = filterCheckboxes.map((checkboxes, index) => {
        const name = filterNames[index];

        return (
            <Menu
                key={name}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={menuAnchorPosition}
                transformOrigin={menuTransformPosition}
                id={name}
                anchorEl={menuStatus[name]}
                keepMounted
                open={Boolean(menuStatus[name])}
                onClose={handleMenuClose(name)}
            >
                <FormGroup>{checkboxes}</FormGroup>
            </Menu>
        );
    });

    return filterMenus;
};

export default TableNavFilterMenu;
