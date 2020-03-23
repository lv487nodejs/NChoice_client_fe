import React from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';

import { SIZES_TYPE_LETTERS, SIZES_TYPE_NUMBER, NUMBER_SIZES_FOR } from '../../config';

import { useStyles } from './Product-add-propetries-item-style';

const input = {
    string: 'string',
    number: 'number',
    size: 'size',
    available: 'available',
    nativeSelect: {
        native: true,
    },
};

const inputVariant = 'outlined';

const ProductAddPropetriesItem = ({
    productPropetriesEdit,
    productEdit,
    name,
    handleInputChange,
}) => {
    const classes = useStyles();
    const select = name === input.size;
    const inputType = name !== input.available ? input.string : input.number;

    const { category } = productEdit;

    const numberSize = NUMBER_SIZES_FOR.find(value => value === category);
    const sizes = !numberSize ? SIZES_TYPE_LETTERS : SIZES_TYPE_NUMBER;

    const sizeOptions = sizes.map(size => (
        <option key={size} value={size}>
            {size}
        </option>
    ));

    return (
        <TextField
            required
            key={name}
            select={select}
            className={classes.textfield}
            name={name}
            label={name}
            type={inputType}
            value={productPropetriesEdit[name]}
            onChange={handleInputChange}
            SelectProps={input.nativeSelect}
            variant={inputVariant}
        >
            <option value="" />
            {sizeOptions}
        </TextField>
    );
};

const mapStateToProps = ({ productEditState: { productEdit, productPropetriesEdit } }) => ({
    productEdit,
    productPropetriesEdit,
});

export default connect(mapStateToProps)(ProductAddPropetriesItem);
