import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { setProducts, productLoadingStatus, setPagesCount } from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { PRODUCTS_TABLE_HEAD } from '../../config';

const ProductList = ({
    adminService,
    products,
    setProducts,
    productLoadingStatus,
    loading,
    history,
    currentPage,
    rowsPerPage,
    setPagesCount,
}) => {
    useEffect(() => {
        productLoadingStatus();
        adminService.getAllProducts(currentPage, rowsPerPage).then(res => {
            setProducts(res.products);
            setPagesCount(res.pagesCount);
        });
    }, [adminService, setProducts, setPagesCount, productLoadingStatus, currentPage, rowsPerPage]);

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
            pagination
        />
    );
};

const mapStateToProps = ({
    productsState: { products, loading },
    paginationState: { currentPage, rowsPerPage },
}) => ({
    products,
    loading,
    currentPage,
    rowsPerPage,
});
const mapDispatchToProps = { setProducts, productLoadingStatus, setPagesCount };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))
);
