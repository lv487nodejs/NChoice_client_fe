import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Form, Button, Col, Row, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { countries, paymentMethods, deliveryType } from '../../configs/frontend-config'
import CheckoutTable from '../checkout-table';
import CheckoutSelect from '../checkout-select';
import withStoreService from '../hoc';
import './checkout-form.css'


const orderForm = {
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    contactPhone: '',
    deliveryType: '',
    paymentMethod: '',
}

const CheckoutForm = ({ cartProducts, storeService }) => {

    const [validated, setValidated] = useState(false);
    const [order, setOrder] = useState(orderForm)
    
    if (cartProducts.length === 0) {
        return (<Redirect to='/' />)
    }

    const storageData = JSON.parse(localStorage.getItem('user'))||{};

    const clearLocalStorage = () => {
        localStorage.removeItem('cart-numbers')
        localStorage.removeItem('products-collection')   
    }

    const productsINeed = cartProducts.map(product => {
        return {
            item: product.id,
            quantity: product.quantity
        }
    })

    const placeholder = "Type here..."

    const orderToServer = {
        orderItems: productsINeed,
        userId: storageData.userId,
        deliveryAddress: {
            country: order.country,
            city: order.city,
            street: order.street,
            buildingNumber: order.buildingNumber
        },
        deliveryType: order.deliveryType,
        contactPhone: order.contactPhone,
        paymentMethod: order.paymentMethod,
        status: "pending"
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || orderToServer.orderItems.length === 0) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return
        }
        clearLocalStorage();
        storeService.postOrder(orderToServer);
    }

    const handleChange = (event) => {
        event.persist();
        setOrder(prevOrder => ({ ...prevOrder, [event.target.name]: event.target.value }));
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Jumbotron>
                        <h2>Order Form</h2>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <fieldset className="field">
                                <h3 className="text-center">Please fill in your address</h3>
                                <Form.Group>
                                    <CheckoutSelect
                                        selectOptions={countries}
                                        name="country"
                                        handleChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="cityValidate">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name={"city"}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type City. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="streetValidate">
                                    <Form.Label required>Street</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name="street"
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type street name. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="buildingValidate">
                                    <Form.Label>Building number</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name="buildingNumber"
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type your building. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="phoneValidate">
                                    <Form.Label>Contact Phone Number</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name="contactPhone"
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type Phone number. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                            <Form.Group className="form-space">
                                <fieldset className="field">
                                    <h3 className="text-center">Please coose delivery type and payment method</h3>
                                    <CheckoutSelect
                                        selectOptions={deliveryType}
                                        handleChange={handleChange}
                                    />

                                    <CheckoutSelect
                                        selectOptions={paymentMethods}
                                        handleChange={handleChange}
                                    />

                                </fieldset>
                            </Form.Group>
                            <Button
                                variant="dark"
                                type="submit"
                            >Create order</Button>
                        </Form>
                    </Jumbotron>
                </Col>
                <Col>
                    <Jumbotron>
                        <h2>Your Items</h2>
                        <CheckoutTable />
                        <Link to="/cart">
                            <Button
                                variant="dark"
                            >Go to cart to make changes</Button>
                        </Link>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = ({ cartReducer: { cartProducts } }) => ({
    cartProducts
});



export default withStoreService()(
    connect(mapStateToProps)(CheckoutForm)
);