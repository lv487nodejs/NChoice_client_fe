import React from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from './Product-add-page-options-style';

const ProductAddOptions = ({ optionValues, onChangeEvent, values, optionName }) => {
    const classes = useStyles();

    return (
        <TextField
            id={optionName}
            select
            className={classes.textfield}
            name={optionName}
            label={`Choose ${optionName}`}
            value={values[optionName]}
            onChange={onChangeEvent}
            SelectProps={{
                native: true,
            }}
            variant="outlined"
        >
            {optionValues}
        </TextField>
    );
};

export default ProductAddOptions;
