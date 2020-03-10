import React from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from './Add-product-choose-style';

const AddProductChoose = ({ options, onChangeEvent, values, name, optionTitle }) => {
    const classes = useStyles();

    return (
        <TextField
            id="outlined-select-currency-native"
            select
            className={classes.textfield}
            name={name}
            label={`Choose ${name}`}
            value={values[name]}
            onChange={onChangeEvent}
            SelectProps={{
                native: true,
            }}
            helperText="Please select Catalog"
            variant="outlined"
        >
            {options}
        </TextField>
    );
};

export default AddProductChoose;
