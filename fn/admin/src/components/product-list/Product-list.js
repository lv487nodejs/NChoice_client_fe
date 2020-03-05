import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import wrapWithAdminService from '../wrappers';
import { productsLoaded, productsRequested } from '../../actions';
import useStyles from './Product-list-style';
import ProductListItem from '../product-list-item';
import LoadingBar from '../loading-bar';

const headTitles = [
    'Catalog',
    'Category',
    'Brand',
    'Title',
    'Price',
    'Mrsp',
    'Actions',
];

const ProductList = ({ adminService, products, productsLoaded, productsRequested, loading }) => {
    const classes = useStyles();

    useEffect(() => {
        productsRequested();
        adminService.getAllProducts().then(res => productsLoaded(res));
    }, [adminService, productsLoaded, productsRequested]);

    const tableHead = headTitles.map(title => <TableCell>{title}</TableCell>);

    const productItems = products.map(product => (
        <ProductListItem
            id={product.id}
            catalog={product.catalog}
            category={product.category}
            brand={product.brand}
            title={product.title}
            msrp={product.msrp}
            price={product.price}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
            >
                <TableHead>
                    <TableRow>{tableHead}</TableRow>
                </TableHead>
                <TableBody>{productItems}</TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = ({ productsList: { products, loading } }) => ({
    products,
    loading,
});
const mapDispatchToProps = { productsLoaded, productsRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
