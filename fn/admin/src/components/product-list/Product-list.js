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

const ProductList = ({ adminService, products, productsLoaded }) => {
    const classes = useStyles();
    useEffect(() => {
        adminService.getAllProducts().then(res => productsLoaded(res));
    }, [adminService, productsLoaded]);
    console.log(products);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Brand</TableCell>
                        <TableCell align="right">Mrsp</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.catalog}>
                            <TableCell component="th" scope="row">
                                {product.title}
                            </TableCell>
                            <TableCell align="right">{product.category}</TableCell>
                            <TableCell align="right">{product.brand}</TableCell>
                            <TableCell align="right">{product.msrp}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = ({ productsList: { products } }) => ({ products });
const mapDispatchToProps = { productsLoaded };

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(ProductList));
