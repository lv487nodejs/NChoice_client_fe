import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import wrapWithAdminService from '../wrappers';

import {
    setProductOptions,
    setFilterOptions,
    setProductOptionsList,
    setProductsFilter,
} from '../../actions';

import useStyle from './Table-nav-style';
import TableNavButtons from '../table-nav-buttons';
import TableNavFilterMenu from '../table-nav-filter-menu';
import { FILTER_OPTIONS } from '../../config';

const filterMenuStatus = {
    catalog: null,
    category: null,
    brand: null,
    color: null,
};

const TableNav = ({
    adminService,
    filterOptions,
    setFilterOptions,
    setProductsFilter,
    setProductOptions,
    setProductOptionsList,
}) => {
    const classes = useStyle();
    const [menuStatus, setMenuStatus] = React.useState(filterMenuStatus);

    const filterInitialState = useCallback(() => {
        adminService.getProductOptions().then(res => {
            setProductOptionsList(res.productOptionsList);
        });
        setFilterOptions(FILTER_OPTIONS);
        setProductsFilter(FILTER_OPTIONS);
    }, [setFilterOptions, setProductsFilter, adminService, setProductOptionsList]);

    useEffect(() => {
        adminService.getProductOptions().then(res => {
            setProductOptionsList(res.productOptionsList);
            setProductOptions(res.productOptions);
        });
        return () => filterInitialState();
    }, [filterInitialState, adminService, setProductOptionsList, setProductOptions]);

    const handleMenuOpen = name => event => {
        const target = event.currentTarget;
        setMenuStatus({ ...menuStatus, [name]: target });
    };

    const handleMenuClose = name => () => {
        setMenuStatus({ ...menuStatus, [name]: null });
        setProductsFilter(filterOptions);
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
        </div>
    );
};

const setMapStateToProps = ({ filtersState: { filterOptions } }) => ({
    filterOptions,
});
const setDispatchToProps = {
    setProductOptions,
    setFilterOptions,
    setProductsFilter,
    setProductOptionsList,
};

export default wrapWithAdminService()(connect(setMapStateToProps, setDispatchToProps)(TableNav));
