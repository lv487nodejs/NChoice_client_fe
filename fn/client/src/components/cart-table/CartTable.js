import React, { useEffect } from 'react';
import './CartTable.css';
import { connect } from 'react-redux';
import { productAddedToCart, productRemovedFromCart, allproductsRemovedFromCart } from '../../actions';

const CartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
    console.log('carttable', items);
    useEffect(() => {}, [items]);
    return (
        <div className="cart-table">
            <h2>Your Order</h2>
            <table className="table" border="1px">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Count</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        const { id, title, count, total } = item;
                        return (
                            <tr key={id}>
                                <td>{title}</td>
                                <td>{count}</td>
                                <td>${total}</td>
                                <td width="25%">
                                    <button className="btn btn-outline-success" onClick={() => onIncrease(id)}>
                                        <i className="fa fa-plus-circle" />
                                    </button>
                                    <button className="btn btn-outline-warning" onClick={() => onDecrease(id)}>
                                        <i className="fa fa-minus-circle" />
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => onDelete(id)}>
                                        <i className="fa fa-trash-o" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p className="total">${total}</p>
        </div>
    );
};
const mapStateToProps = ({ productsList: {cartItems,orderTotal } }) => ({
    items: cartItems,
    total: orderTotal,
});
// if you send to connect simple object, connect will dispatch values itself

const mapDispatchToProps = {
    onIncrease: productAddedToCart,
    onDecrease: productRemovedFromCart,
    onDelete: allproductsRemovedFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
