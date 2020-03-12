import React from 'react';
import { TextField } from '@material-ui/core';

import { INPUT_TYPE_NUMBER, INPUT_MULTILINE } from '../../config';

const INPUT_PROPS = { min: 0, maxLength: 150 };

const ProductAddItemDescr = ({ classes, option, values, onChangeEvent }) => {
    const inputMultiline = INPUT_MULTILINE.includes(option);
    let inputType = 'string';
    if (INPUT_TYPE_NUMBER.includes(option)) inputType = 'number';

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
            inputProps={INPUT_PROPS}
        />
    );
};

export default ProductAddItemDescr;
