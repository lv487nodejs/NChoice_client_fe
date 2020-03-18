import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import {
    setFilterOptionsGroups,
    setFilterSelected,
    setFilterOptionsList,
    setProductsFilters,
    setCheckBoxStatus,
    setFilterCounters,
    setSearchTerm,
    setTableDense,
} from '../../actions';

import useStyle from './Table-nav-style';
import TableNavButtons from '../table-nav-buttons';
import TableNavFilterMenu from '../table-nav-filter-menu';
import TableNavSearchBar from '../table-nav-searchbar';

import { FILTER_OPTIONS, FILTER_COUNTERS } from '../../config';

const filterMenuStatus = {
    catalog: null,
    category: null,
    brand: null,
};

const searchClear = '';

const TableNav = ({
    adminService,
    filterSelected,
    filterOptionsList,
    setCheckBoxStatus,
    checkboxLoaded,
    setFilterSelected,
    setFilterOptionsList,
    setProductsFilters,
    setFilterOptionsGroups,
    setFilterCounters,
    setSearchTerm,
    setTableDense,
    dense,
}) => {
    const classes = useStyle();
    const [menuStatus, setMenuStatus] = React.useState(filterMenuStatus);

    const { productPropetriesService } = adminService;

    const setCheckBoxes = useCallback(() => {
        productPropetriesService
            .getProductOptions()
            .then(res => setCheckBoxStatus(res.filterOptionsList));
    }, [setCheckBoxStatus, productPropetriesService]);

    useEffect(() => {
        if (!checkboxLoaded) {
            setCheckBoxes();
        }
    }, [setCheckBoxes, checkboxLoaded]);

    useEffect(() => {
        productPropetriesService.getProductOptions().then(res => {
            setFilterOptionsList(res.filterOptionsList);
            setFilterOptionsGroups(res.filterOptions);
        });
    }, [productPropetriesService, setFilterOptionsList, setFilterOptionsGroups]);

    const filterInitialState = () => {
        setCheckBoxStatus(filterOptionsList);
        setFilterSelected(FILTER_OPTIONS);
        setProductsFilters(FILTER_OPTIONS);
        setFilterCounters(FILTER_COUNTERS);
        setSearchTerm(searchClear);
    };

    const handleChangeTableDense = event => {
        setTableDense(event.target.checked);
    };

    const handleMenuOpen = name => event => {
        const target = event.currentTarget;
        setMenuStatus({ ...menuStatus, [name]: target });
    };

    const handleMenuClose = name => () => {
        setMenuStatus({ ...menuStatus, [name]: null });
        setProductsFilters(filterSelected);
    };

    const handleClearFilter = () => {
        filterInitialState();
    };

    return (
        <div className={classes.tableNav}>
            <TableNavButtons
                handleMenuOpen={handleMenuOpen}
                handleClearFilter={handleClearFilter}
            />
            <TableNavFilterMenu handleMenuClose={handleMenuClose} menuStatus={menuStatus} />
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeTableDense} size="small" />}
                label="Compact mode"
            />
            <TableNavSearchBar />
        </div>
    );
};

const setMapStateToProps = ({
    filtersState: { filterSelected, filterOptionsList, checkboxStatus, checkboxLoaded },
    tableState: { dense },
}) => ({
    filterSelected,
    filterOptionsList,
    checkboxStatus,
    checkboxLoaded,
    dense,
});
const setDispatchToProps = {
    setFilterOptionsGroups,
    setFilterSelected,
    setProductsFilters,
    setFilterOptionsList,
    setCheckBoxStatus,
    setFilterCounters,
    setSearchTerm,
    setTableDense,
};

export default wrapWithAdminService()(connect(setMapStateToProps, setDispatchToProps)(TableNav));
