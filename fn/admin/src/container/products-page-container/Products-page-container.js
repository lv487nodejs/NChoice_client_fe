import React from 'react';
import { useStyles } from './Products-page-container-styles';
import ProductList from '../../components/product-list/Product-list';

const ProductsPageContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <ProductList />
        </div>
    );
};

export default ProductsPageContainer;
