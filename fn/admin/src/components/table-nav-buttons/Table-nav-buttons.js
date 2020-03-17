import React from 'react';

import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

import useStyle from './Table-nav-buttons-style';

import { FILTER_OPTION_NAMES } from '../../config';

const filterNames = FILTER_OPTION_NAMES;
const pathToAddProductPage = '/productadd';

const TableNavButtons = ({ handleMenuOpen, handleClearFilter }) => {
    const classes = useStyle();

    const filterButtons = filterNames.map(name => (
        <Button key={name} size="small" onClick={handleMenuOpen(name)}>
            {name}
        </Button>
    ));

    return (
        <div className={classes.root}>
            <Button
                className={classes.tableNavButtons}
                component={Link}
                to={pathToAddProductPage}
                variant="contained"
                color="primary"
                size="small"
            >
                NEW PRODUCT
            </Button>
            <Typography variant="button" className={classes.filterTitle}>
                Filter by:
            </Typography>
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
