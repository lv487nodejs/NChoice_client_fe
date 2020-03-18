import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import wrapWithAdminService from '../wrappers';

import {
    setFilterOptionsGroups,
    setFilterSelected,
    setFilterOptionsList,
    setProductsFilters,
    setCheckBoxStatus,
} from '../../actions';

import useStyle from './Table-nav-style';
import TableNavButtons from '../table-nav-buttons';
import TableNavFilterMenu from '../table-nav-filter-menu';
import TableNavSearchBar from '../table-nav-searchbar';

import { FILTER_OPTIONS } from '../../config';

const filterMenuStatus = {
    catalog: null,
    category: null,
    brand: null,
};

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
}) => {
    const classes = useStyle();
    const [menuStatus, setMenuStatus] = React.useState(filterMenuStatus);

    const { productPropetriesService } = adminService;

    useEffect(() => {
        productPropetriesService.getProductOptions().then(res => {
            if (!checkboxLoaded) {
                setCheckBoxStatus(res.filterOptionsList);
            }
            setFilterOptionsList(res.filterOptionsList);
            setFilterOptionsGroups(res.filterOptions);
        });
    }, [
        setCheckBoxStatus,
        checkboxLoaded,
        productPropetriesService,
        setFilterOptionsGroups,
        setFilterOptionsList,
    ]);

    const filterInitialState = () => {
        setCheckBoxStatus(filterOptionsList);
        setFilterSelected(FILTER_OPTIONS);
        setProductsFilters(FILTER_OPTIONS);
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
            <TableNavSearchBar />
        </div>
    );
};

const setMapStateToProps = ({
    filtersState: { filterSelected, filterOptionsList, checkboxStatus, checkboxLoaded },
}) => ({
    filterSelected,
    filterOptionsList,
    checkboxStatus,
    checkboxLoaded,
});
const setDispatchToProps = {
    setFilterOptionsGroups,
    setFilterSelected,
    setProductsFilters,
    setFilterOptionsList,
    setCheckBoxStatus,
};

export default wrapWithAdminService()(connect(setMapStateToProps, setDispatchToProps)(TableNav));
