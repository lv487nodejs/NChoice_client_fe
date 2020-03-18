import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { productLoaded, productsRequested } from '../../actions';
import withStoreService from '../hoc';

const ProductDetails = ({ id, product, productLoaded, productsRequested, storeService }) => {
    useEffect(() => {
        productsRequested();
        storeService.getProductById(id).then(res => productLoaded(res));
    }, [productsRequested, storeService, id, productLoaded]);
console.log(product)
    return <div>{product.title}</div>;
};

const mapStateToProps = ({ productsList: { product, loading } }) => ({ product, loading });
const mapDispatchToProps = { productLoaded, productsRequested };

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));
