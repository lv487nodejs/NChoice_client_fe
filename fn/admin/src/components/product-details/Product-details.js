import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import wrapWithAdminService from '../wrappers';
import { productLoaded } from '../../actions';

const ProductDetails = props => {
    const { adminService, product, productLoaded, productId } = props;
    console.log(productId, 'here');
    useEffect(() => {
        adminService.getProductById(productId).then(res => productLoaded(res));
    }, [adminService, productLoaded, productId]);

    return <p> {product.title} </p>;
};

const mapStateToProps = ({ productsList: { product } }) => ({ product });
const mapDispatchToProps = { productLoaded };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
