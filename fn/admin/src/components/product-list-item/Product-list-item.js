import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import wrapWithAdminService from '../wrappers';
import { productsLoaded } from '../../actions';

const ProductList = ({ adminService, products }) => {
    useEffect(() => {
        adminService.getAllProducts().then(res => productsLoaded(res));
    }, [adminService]);
    console.log(products);

    return (
        <div>
            {products.map(product => (
                <p>{product.title}</p>
            ))}
        </div>
    );
};

const mapStateToProps = ({ productsList: { products } }) => ({ products });
const mapDispatchToProps = { productsLoaded };

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));
