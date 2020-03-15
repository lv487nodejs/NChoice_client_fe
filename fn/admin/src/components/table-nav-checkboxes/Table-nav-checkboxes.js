import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import wrapWithAdminService from '../wrappers';

import { FILTER_OPTIONS, PRODUCT_OPTION_NAMES } from '../../config';

import {
    setProductOptions,
    setFilterOptions,
    setProductOptionsList,
    setProductsFilter,
} from '../../actions';

import TableNavButtons from '../table-nav-buttons';
import TableNavFilterMenu from '../table-nav-filter-menu';
import TableNavFilterMenuItem from '../table-nav-filter-menuitem';

const filterMenuStatus = {
    catalog: null,
    category: null,
    brand: null,
    color: null,
};

const filterNames = PRODUCT_OPTION_NAMES;

const TableNavCheckboxes = ({
    adminService,
    filterOptions,
    productOptions,
    setFilterOptions,
    setProductsFilter,
    setProductOptions,
    setProductOptionsList,
}) => {
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

    const getFilterOptions = (group, name) =>
        group.map(groupOption => {
            const filter = groupOption[name];

            return <TableNavFilterMenuItem name={name} filter={filter} groupOption={groupOption} />;
        });

    const filterCheckboxes = productOptions.map((group, index) => {
        const name = filterNames[index];
        const options = getFilterOptions(group, name);
        return options;
    });

    return (
        <div>
            <TableNavButtons
                handleMenuOpen={handleMenuOpen}
                handleClearFilter={handleClearFilter}
            />
            <TableNavFilterMenu
                handleMenuClose={handleMenuClose}
                filterCheckboxes={filterCheckboxes}
                menuStatus={menuStatus}
            />
        </div>
    );
};

const setMapStateToProps = ({
    filtersState: { filterOptions },
    productsState: { productOptions },
}) => ({
    filterOptions,
    productOptions,
});
const setDispatchToProps = {
    setProductOptions,
    setFilterOptions,
    setProductsFilter,
    setProductOptionsList,
};

export default wrapWithAdminService()(
    connect(setMapStateToProps, setDispatchToProps)(TableNavCheckboxes)
);
