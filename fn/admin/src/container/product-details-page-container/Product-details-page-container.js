import React from 'react';
import { useStyles } from './Product-details-page-container-styles';

import ProductDetails from '../../components/product-details';

const ProductDetailsPageContainer = props => {
    const classes = useStyles();
    const { id } = props.match.params;
    console.log(id)
    return (
        <div className={classes.content}>
            <ProductDetails productId={id} />
        </div>
    );
};

export default ProductDetailsPageContainer;
