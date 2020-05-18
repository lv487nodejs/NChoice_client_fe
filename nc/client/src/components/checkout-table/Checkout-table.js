import React from 'react';
import './Checkout-table.css';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


const CheckoutTable = ({ cartProducts, currency, currencyIcon}) => {

    // Count one row total price
    const tableRowPrice = (price , quantity) => {
        return (parseFloat(price * quantity * currency).toFixed(2));
    };

    // Count total price
    const totalCounter = () => {
        const row = cartProducts.map(product => product.price * product.quantity);
        const total = row.reduce((sum, next) => sum + next);
        return (parseFloat(total * currency).toFixed(2));
    };

    // Creating table rows
    const tableRows = cartProducts.map(productRow =>
        <tr key={productRow.propetries._id}>
            <td>
                <img
                    className="order-tbl-img"
                    alt="order-item"
                    src={`/images/products/${productRow.images}`}
                />
            </td>
            <td>{productRow.title}</td>
            <td>{productRow.quantity}</td>
            <td>{tableRowPrice(productRow.price, productRow.quantity)} {currencyIcon}</td>
        </tr>
    )

    return (
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
                {tableRows}
                <tr>
                    <td colSpan="3">Total:</td>
                    <td>{`${totalCounter()} ${currencyIcon}`}</td>
                </tr>
            </tbody>
        </Table>
    );

}



const mapStateToProps = ({ cartReducer: { cartProducts }, productsList: { currency, currencyIcon } }) => ({
    cartProducts,
    currency, 
    currencyIcon 
});

export default connect(mapStateToProps)(CheckoutTable);
