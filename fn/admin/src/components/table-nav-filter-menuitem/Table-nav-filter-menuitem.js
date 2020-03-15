import React from 'react';

import { MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';

import { setFilterOptions, setProductOptionsList } from '../../actions';

const TableNavFilterMenuItem = ({
    name,
    filter,
    groupOption,
    filterOptions,
    productOptionsList,
    setFilterOptions,
    setProductOptionsList,
}) => {
    const addFilter = (name, filter) => ({
        ...filterOptions,
        [name]: [...filterOptions[name], filter],
    });

    const removeFilter = (name, filter) => {
        const filters = filterOptions[name].filter(option => option !== filter);
        return {
            ...filterOptions,
            [name]: filters,
        };
    };

    const handleChange = (name, filter) => event => {
        const { checked } = event.target;
        setProductOptionsList({ ...productOptionsList, [filter]: checked });
        if (checked) {
            setFilterOptions(addFilter(name, filter));
        } else {
            setFilterOptions(removeFilter(name, filter));
        }
    };

    return (
        <MenuItem key={filter}>
            <FormControlLabel
                key={groupOption[name]}
                control={
                    <Checkbox
                        key={filter}
                        value={filter}
                        checked={productOptionsList[filter]}
                        color="primary"
                        onChange={handleChange(name, filter)}
                    />
                }
                label={groupOption[name]}
            />
        </MenuItem>
    );
};

const setMapStateToProps = ({
    filtersState: { filterOptions },
    productsState: { productOptionsList },
}) => ({
    filterOptions,
    productOptionsList,
});

const setDispatchToProps = {
    setFilterOptions,
    setProductOptionsList,
};

export default connect(setMapStateToProps, setDispatchToProps)(TableNavFilterMenuItem);
