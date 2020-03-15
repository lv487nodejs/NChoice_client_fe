import React from 'react';

import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';

import { PRODUCT_OPTION_NAMES } from '../../config';

const filterNames = PRODUCT_OPTION_NAMES;
const pathToAddProductPage = '/productadd';

const TableNavButtons = ({ handleMenuOpen, handleClearFilter }) => {
    const filterButtons = filterNames.map(name => (
        <Button key={name} size="small" onClick={handleMenuOpen(name)}>
            {name}
        </Button>
    ));

    return (
        <div>
            <Button
                component={Link}
                to={pathToAddProductPage}
                variant="contained"
                color="primary"
                size="small"
            >
                NEW PRODUCT
            </Button>
            <ButtonGroup variant="contained" color="primary">
                {filterButtons}
                <Button key="clearAll" size="small" onClick={handleClearFilter}>
                    Clear All
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default TableNavButtons;
