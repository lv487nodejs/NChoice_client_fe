import React from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';

import { INPUT_TYPE_NUMBER, INPUT_MULTILINE } from '../../config';

const INPUT_PROPS = { min: 0, maxLength: 150 };
const INPUT_VARIANT = 'outlined';

const ProductAddItemDescr = ({ classes, option, productEdit, onChangeEvent }) => {
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
            value={productEdit[option]}
            onChange={onChangeEvent}
            type={inputType}
            variant={INPUT_VARIANT}
            multiline={inputMultiline}
            inputProps={INPUT_PROPS}
        />
    );
};

const mapStateToProps = ({ productEditState: { productEdit } }) => ({
    productEdit,
});

export default connect(mapStateToProps)(ProductAddItemDescr);
