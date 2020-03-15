import React from 'react';
import { connect } from 'react-redux';

import { Menu, FormGroup } from '@material-ui/core';

import { PRODUCT_OPTION_NAMES } from '../../config';
import TableNavFilterMenuItem from '../table-nav-filter-menuitem';

const menuAnchorPosition = {
    vertical: 'bottom',
    horizontal: 'center',
};

const menuTransformPosition = {
    vertical: 'top',
    horizontal: 'center',
};

const filterNames = PRODUCT_OPTION_NAMES;

const TableNavFilterMenu = ({ productOptions, handleMenuClose, menuStatus }) => {
    const getFilterOptions = (group, name) =>
        group.map(groupOption => {
            const filter = groupOption[name];

            return (
                <TableNavFilterMenuItem
                    key={filter}
                    name={name}
                    filter={filter}
                    groupOption={groupOption}
                />
            );
        });

    const filterCheckboxes = productOptions.map((group, index) => {
        const name = filterNames[index];
        const options = getFilterOptions(group, name);
        return options;
    });

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

const setMapStateToProps = ({ productsState: { productOptions } }) => ({
    productOptions,
});

export default connect(setMapStateToProps)(TableNavFilterMenu);
