import React from 'react';
import { TextField } from '@material-ui/core';

import { INPUT_TYPE_NUMBER, INPUT_MULTILINE } from '../../config';

const NOT_HAVE = -1;

const ProductAddItemDescr = ({ classes, option, values, onChangeEvent }) => {
    let multiline = false;
    let inputType = 'string';
    if (INPUT_TYPE_NUMBER.findIndex(rule => rule === option) > NOT_HAVE) inputType = 'number';
    if (INPUT_MULTILINE.findIndex(rule => rule === option) > NOT_HAVE) multiline = true;

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
            multiline={multiline}
        />
    );
};

export default ProductAddItemDescr;
