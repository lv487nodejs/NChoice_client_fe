import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Badge, Button, Typography } from '@material-ui/core';

import useStyle from './Table-nav-buttons-style';

import { FILTER_OPTION_NAMES } from '../../config';

const filterNames = FILTER_OPTION_NAMES;
const pathToAddProductPage = '/productadd';

const FILTERS_TITLE = 'Filter by:';
const CLEAR_BUTTON_TITLE = 'Clear All';
const NEW_PRODUCT_BUTTON_TITLE = 'NEW PRODUCT';

const TableNavButtons = ({ filterCounters, handleMenuOpen, handleClearFilter, dense }) => {
    const classes = useStyle();
    const size = dense ? 'small' : 'medium';

    const filterButtons = filterNames.map(name => (
        <Badge key={name} color="error" badgeContent={filterCounters[name]}>
            <Button variant="contained" color="primary" size={size} onClick={handleMenuOpen(name)}>
                {name}
            </Button>
        </Badge>
    ));

    const clearDisable = filterCounters.total === 0;

    return (
        <div className={classes.root}>
            <Button
                className={classes.tableNavButtons}
                component={Link}
                to={pathToAddProductPage}
                variant="contained"
                color="primary"
                size={size}
            >
                {NEW_PRODUCT_BUTTON_TITLE}
            </Button>
            <Typography variant="button" className={classes.filterTitle}>
                {FILTERS_TITLE}
            </Typography>

            {filterButtons}
            <Button
                color="primary"
                variant="contained"
                disabled={clearDisable}
                key={CLEAR_BUTTON_TITLE}
                onClick={handleClearFilter}
                size={size}
            >
                {CLEAR_BUTTON_TITLE}
            </Button>
        </div>
    );
};

const mapStateToProps = ({ filtersState: { filterCounters }, tableState: { dense } }) => ({
    filterCounters,
    dense,
});

export default connect(mapStateToProps)(TableNavButtons);
