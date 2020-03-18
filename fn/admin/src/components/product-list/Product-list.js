import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { setProducts, setProductLoadingStatus, setPagesCount } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { PRODUCTS_TABLE_HEAD } from '../../config';

const ProductList = ({
    adminService,
    products,
    filters,
    searchTerm,
    setProducts,
    setProductLoadingStatus,
    loading,
    history,
    currentPage,
    rowsPerPage,
    setPagesCount,
}) => {
    const { productsService } = adminService;
    useEffect(() => {
        setProductLoadingStatus();
        productsService
            .getProductsByFilter(currentPage, rowsPerPage, filters, searchTerm)
            .then(res => {
                setProducts(res.products);
                setPagesCount(res.foundProductsNumber);
            });
    }, [
        productsService,
        setProducts,
        setPagesCount,
        setProductLoadingStatus,
        currentPage,
        rowsPerPage,
        filters,
        loading,
        searchTerm,
    ]);

    if (loading) {
        return <LoadingBar />;
    }

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

    const productTable = (
        <TableContainerGenerator
            tableTitles={PRODUCTS_TABLE_HEAD}
            tableItems={productItems}
            pagination
        />
    );

    return productTable;
};

const mapStateToProps = ({
    productsState: { products, filters, loading },
    paginationState: { currentPage, rowsPerPage },
    searchState: { searchTerm },
}) => ({
    products,
    filters,
    loading,
    currentPage,
    rowsPerPage,
    searchTerm,
});
const mapDispatchToProps = { setProducts, setProductLoadingStatus, setPagesCount };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
);
