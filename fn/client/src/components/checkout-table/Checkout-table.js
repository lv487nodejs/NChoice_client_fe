import React from 'react';
import './Checkout-table.css';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';


const CheckoutTable = ({ products, currency }) => (
    <Table
        bordered
        hover
        responsive>
        <thead>
            <tr>
                <th>Image</th>
                <th>Item name</th>
                <th>Quantity</th>
                <th>Item prise</th>
            </tr>
        </thead>
        <tbody>
            {products.map(productRow =>
                <tr key={productRow.id}>
                    <td>
                        <img
                            className="order-tbl-img"
                            src={`/images/products/${productRow.images}`} />
                    </td>
                    <td>{productRow.title}</td>
                    <td>{productRow.quantity}</td>
                    <td>{Math.round(productRow.price * productRow.quantity * currency).toFixed(2)}</td>
                </tr>
            )}
            <tr>
                <td colSpan="3">Total:</td>
                <td>1000!!!</td>
            </tr>
        </tbody>
    </Table>
);


const mapStateToProps = ({ cartReducer: { products }, productsList: { currency } }) => ({
    products,
    currency
});

export default connect(mapStateToProps)(CheckoutTable);
