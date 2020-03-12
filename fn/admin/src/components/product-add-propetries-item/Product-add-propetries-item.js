import React from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';

import { SIZES_CLOTHES, SIZES_SHOES } from '../../config';

const input = {
    string: 'string',
    number: 'number',
    size: 'size',
    available: 'available',
    nativeSelect: {
        native: true,
    },
};

const ProductAddPropetriesItem = ({
    newPropetries,
    newProduct,
    name,
    classes,
    handleInputChange,
}) => {
    const select = name === input.size;
    const inputType = name !== input.available ? input.string : input.number;

    const notShoes = newProduct.category !== 'shoes';
    const sizes = notShoes ? SIZES_CLOTHES : SIZES_SHOES;

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
            value={newPropetries[name]}
            onChange={handleInputChange}
            SelectProps={input.nativeSelect}
            variant="outlined"
        >
            <option value="" />
            {sizeOptions}
        </TextField>
    );
};

const mapStateToProps = ({ newProductState: { newProduct, newPropetries, loading } }) => ({
    newProduct,
    newPropetries,
});

export default connect(mapStateToProps)(ProductAddPropetriesItem);
