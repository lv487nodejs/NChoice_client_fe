import React from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from './Product-add-page-descr-style';

const ProductDescriptions = ({ option, values, onChangeEvent }) => {
    const classes = useStyles();

    let multiline = false;
    let inputType = 'string';
    if (option === 'msrp' || option === 'price') inputType = 'number';
    if (option === 'description') multiline = true;

    return (
        <TextField
            className={classes.textfield}
            id={option}
            label={option}
            name={option}
            value={values[option]}
            onChange={onChangeEvent}
            type={inputType}
            variant="outlined"
            multiline={multiline}
        />
    );
};

export default ProductDescriptions;
