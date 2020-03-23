import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import {
    setProducts,
    setProductLoadingStatus,
    setPagesCount,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setDrawerStatus,
} from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { PRODUCTS_TABLE_HEAD } from '../../config';

const REMOVE_TITLE = 'Product remove';
const REMOVE_MESSAGE = 'Are you sure you want to remove product?';
const SUCCESS_STATUS = 'success';
const PATH_TO_PRODUCT = id => `/product/${id}`;

const ProductList = ({
    adminService,
    products,
    filters,
    searchTerm,
    setProducts,
    loading,
    history,
    currentPage,
    rowsPerPage,
    setPagesCount,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setProductLoadingStatus,
    setDrawerStatus,
}) => {
    const { productsService } = adminService;

    const getProducts = useCallback(() => {
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
        searchTerm,
    ]);

    useEffect(() => {
        setDrawerStatus(false)
        getProducts();
    }, [getProducts, setDrawerStatus]);

    const editHandler = productId => () => {
        history.push(PATH_TO_PRODUCT(productId));
    };

    const openDialogWindow = eventHandler => {
        setDialogTitle(REMOVE_TITLE);
        setDialogContent(REMOVE_MESSAGE);
        setButtonTitle(REMOVE_TITLE);
        setEventHandler(eventHandler);
        setDialogStatus(true);
    };

    const removeHandler = productId => () => {
        const removeProduct = async () => {
            const res = await productsService.removeProduct(productId);
            getProducts();
            setDialogStatus(false);
            setSnackBarMessage(res);
            setSnackBarSeverity(SUCCESS_STATUS);
            setSnackBarStatus(true);
        };

        openDialogWindow(removeProduct);
    };

    const productItems = products.map((product, index) => (
        <TableContainerRow
            key={index}
            id={product.id}
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            mrsp={product.mrsp}
            price={product.price}
            editHandler={editHandler(product.id)}
            deleteHandler={removeHandler(product.id)}
        />
    ));

    const productTable = (
        <TableContainerGenerator
            tableTitles={PRODUCTS_TABLE_HEAD}
            tableItems={productItems}
            pagination
        />
    );

    if (loading) {
        return <LoadingBar />;
    }

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
const mapDispatchToProps = {
    setProducts,
    setProductLoadingStatus,
    setPagesCount,
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setDrawerStatus,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
);
