import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { productsLoaded, productsRequested } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { PRODUCTS_TABLE_HEAD } from '../../config';

const ProductList = ({
    adminService,
    products,
    productsLoaded,
    productsRequested,
    loading,
    history,
}) => {
    useEffect(() => {
        productsRequested();
        adminService.getAllProducts().then(res => productsLoaded(res));
    }, [adminService, productsLoaded, productsRequested]);

    const productItems = products.map((product, index) => (
        <TableContainerRow
            key={index}
            id={product.id}
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            msrp={product.msrp}
            price={product.price}
            editHandler={() => {
                history.push(`/product/${product.id}`);
            }}
            deleteHandler={() => {
                console.log(product.id);
            }}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <TableContainerGenerator
            tableTitles={PRODUCTS_TABLE_HEAD}
            tableItems={productItems}
        />
    );
};

const mapStateToProps = ({ productsList: { products, loading } }) => ({
    products,
    loading,
});
const mapDispatchToProps = { productsLoaded, productsRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
);
