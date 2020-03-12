import React from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import { PRODUCT_KEYS, PROPETRIES_KEYS } from '../../config';

const ProductAddVerifyPage = ({ newProduct }) => {
    const productValues = PRODUCT_KEYS.map(key => (
        <Typography key={key}>{`${key}: ${newProduct[key]}`}</Typography>
    ));

    const productPropetries = newProduct.propetries.map(item =>
        PROPETRIES_KEYS.map(key => (
            <Typography key={item[key]}>{`${key}: ${item[key]}`}</Typography>
        ))
    );

    return (
        <div>
            {productValues}
            {productPropetries}
        </div>
    );
};

const mapStateToProps = ({ newProductState: { newProduct } }) => ({
    newProduct,
});

export default connect(mapStateToProps)(ProductAddVerifyPage);
