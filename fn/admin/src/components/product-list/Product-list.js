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
import { productsLoaded } from '../../actions';
import useStyles from './Product-list-style';
import ProductListItem from '../product-list-item';

const headTitles = [
    'Catalog',
    'Category',
    'Brand',
    'Title',
    'Price',
    'Mrsp',
    'Actions',
];

const ProductList = ({ adminService, products, productsLoaded }) => {
    const classes = useStyles();
    useEffect(() => {
        adminService.getAllProducts().then(res => productsLoaded(res));
    }, [adminService, productsLoaded]);

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

const mapStateToProps = ({ productsList: { products } }) => ({ products });
const mapDispatchToProps = { productsLoaded };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
