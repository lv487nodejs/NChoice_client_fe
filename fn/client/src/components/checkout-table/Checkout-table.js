import React from 'react';
import './Checkout-table.css';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';


const CheckoutTable = ({ cartProducts, currency, currencyIcon}) => {

    const tableRowPrice = (price , quantity) => {
        return (parseFloat(price * quantity * currency).toFixed(2))
    }

    const totalCounter = () => {
        const row = cartProducts.map(product => product.price * product.quantity);
        const total = row.reduce((sum, next) => sum + next)
        return (parseFloat(total * currency).toFixed(2))
    }

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
                {cartProducts.map(productRow =>
                    <tr key={productRow.id}>
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
                )}
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
