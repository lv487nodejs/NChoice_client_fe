import React from 'react';
import { TextField } from '@material-ui/core';

import { INPUT_TYPE_NUMBER, INPUT_MULTILINE } from '../../config';

const NOT_INCLUDE = -1;
let inputMultiline = false;
let inputType = 'string';

const ProductAddItemDescr = ({ classes, option, values, onChangeEvent }) => {
    if (INPUT_TYPE_NUMBER.findIndex(rule => rule === option) > NOT_INCLUDE) inputType = 'number';
    if (INPUT_MULTILINE.findIndex(rule => rule === option) > NOT_INCLUDE) inputMultiline = true;

    return (
        <TextField
            required
            className={classes.textfield}
            id={option}
            label={option}
            name={option}
            value={values[option]}
            onChange={onChangeEvent}
            type={inputType}
            variant="outlined"
            multiline={inputMultiline}
        />
    );
};

export default ProductAddItemDescr;
