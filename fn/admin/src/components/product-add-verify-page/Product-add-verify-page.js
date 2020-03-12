import React from 'react';

import { Typography } from '@material-ui/core';

const productKeys = [
    'catalog',
    'category',
    'brand',
    'color',
    'title',
    'description',
    'mrsp',
    'price',
];

const propsKeys = ['size', 'available', 'sku'];

const ProductAddVerifyPage = ({ product }) => {
    const productValues = productKeys.map(key => (
        <Typography key={key}>{`${key}: ${product[key]}`}</Typography>
    ));

    const productPropetries = product.propetries.map(item =>
        propsKeys.map(key => <Typography key={item[key]}>{`${key}: ${item[key]}`}</Typography>)
    );

    return (
        <div>
            {productValues}
            {productPropetries}
        </div>
    );
};

export default ProductAddVerifyPage;
