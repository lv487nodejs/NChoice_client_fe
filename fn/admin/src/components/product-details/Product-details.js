import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import wrapWithAdminService from '../wrappers';
import { productLoaded, productsRequested } from '../../actions';
import LoadingBar from '../loading-bar';

const ProductDetails = props => {
    const {
        adminService,
        product,
        productLoaded,
        productsRequested,
        productId,
        loading,
    } = props;

    useEffect(() => {
        productsRequested();
        adminService.getProductById(productId).then(res => productLoaded(res));
    }, [adminService, productLoaded, productId, productsRequested]);
    if (loading) {
        return <LoadingBar />;
    }
    return <p> {product.title} </p>;
};

const mapStateToProps = ({ productsList: { product, loading } }) => ({
    product,
    loading,
});
const mapDispatchToProps = { productLoaded, productsRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
