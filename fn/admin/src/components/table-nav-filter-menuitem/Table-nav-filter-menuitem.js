import React from 'react';

import { MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';

import { setFilterSelected, setCheckBoxStatus } from '../../actions';

const TableNavFilterMenuItem = ({
    name,
    filter,
    groupOption,
    filterSelected,
    checkboxStatus,
    setFilterSelected,
    setCheckBoxStatus,
}) => {
    const addFilter = (name, filter) => ({
        ...filterSelected,
        [name]: [...filterSelected[name], filter],
    });

    const removeFilter = (name, filter) => {
        const filters = filterSelected[name].filter(option => option !== filter);
        return {
            ...filterSelected,
            [name]: filters,
        };
    };

    const handleChange = (name, filter) => event => {
        const { checked } = event.target;
        setCheckBoxStatus({ ...checkboxStatus, [filter]: checked });
        if (checked) {
            setFilterSelected(addFilter(name, filter));
        } else {
            setFilterSelected(removeFilter(name, filter));
        }
    };

    const checkBox = (
        <Checkbox checked={checkboxStatus[filter]} onChange={handleChange(name, filter)} />
    );

    return (
        <MenuItem key={filter}>
            <FormControlLabel control={checkBox} label={groupOption[name]} />
        </MenuItem>
    );
};

const setMapStateToProps = ({ filtersState: { filterSelected, checkboxStatus } }) => ({
    filterSelected,
    checkboxStatus,
});

const setDispatchToProps = {
    setFilterSelected,
    setCheckBoxStatus,
};

export default connect(setMapStateToProps, setDispatchToProps)(TableNavFilterMenuItem);
