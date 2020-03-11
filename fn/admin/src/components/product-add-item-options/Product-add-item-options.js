import React from 'react';
import { TextField } from '@material-ui/core';

const ProductAddItemOptions = ({ classes, optionValues, onChangeEvent, values, optionName }) => (
    <TextField
        required
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

export default ProductAddItemOptions;
