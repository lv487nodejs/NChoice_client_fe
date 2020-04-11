import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Form, Button, Col, Row, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { countries, paymentMethods, deliveryType} from '../../configs/frontend-config'
import { setShowSnackbar, setSnackbarText, clearCart, setOrderToStore } from '../../actions'
import CheckoutTable from '../checkout-table';
import CheckoutSelect from '../checkout-select';
import withStoreService from '../hoc';
import './checkout-form.css';
import Snackbar from '../snackbar';



const orderForm = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    contactPhone: '',
    deliveryType: '',
    paymentMethod: '',
}

const CheckoutForm = ({
    cartProducts,
    orderStore,
    clearCart,
    storeService,
    setShowSnackbar,
    setSnackbarText,
    setOrderToStore,
}) => {

    const notAvaliable = [];

    // Check the database for quantity of products in order
    useEffect(() => {
        cartProducts.map((product) => {
            storeService.getOneProductPropertie(product.propetries._id)
                .then((res) => res[0].available)
                .then((available) => {
                    const itemAvailable = {
                        name: product.title,
                        available: available
                    }
                    if (product.quantity > available) {
                        notAvaliable.push(itemAvailable)
                        return
                    }
                });
            return notAvaliable
        })
    }, [cartProducts,
        notAvaliable,
        storeService]);

    const [validated, setValidated] = useState(false);

    const [order, setOrder] = useState(orderForm);

    const [successOrder, setsuccessOrder] = useState(false);

    const placeholder = "Type here..."

    // get user's id from localStorage and clear localStorage after submit'
    const storageData = JSON.parse(localStorage.getItem('userId')) || '';
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

    // Create object with form data to send to server
    const orderToServer = {
        firstName: order.firstName,
        lastName: order.lastName,
        orderItems: productsINeed,
        userId: storageData.userId,
        email: storageData.email,
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

    if (successOrder) {
        return (<Redirect to='/thanks' />)
    }

    if (cartProducts.length === 0) {
        return (<Redirect to='/' />)
    }

    const snackbarHandler = (text) => {
        setSnackbarText(text)
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false)
        }, 10000)
    }

    const handleSubmit = (event) => {
        setOrderToStore(orderToServer)
        if (notAvaliable.length !== 0) {
            const snackbarText = notAvaliable.map((badItem) => {
                return (`We dont have enough ${badItem.name}
                        There are just ${badItem.available}.
                        Please go to cart and change amount of ${badItem.name}`)
            })
            snackbarHandler(snackbarText)
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false || orderToServer.orderItems.length === 0 || notAvaliable.length !== 0) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return
        }
        event.preventDefault()
        storeService.postOrder(orderToServer)
        setsuccessOrder(true)
        clearLocalStorage()
        clearCart()
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
                                <h3 className="text-center">Please tell us about yourself</h3>

                                <Form.Group controlId="firstNameValidate">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name={"firstName"}
                                        onChange={handleChange}
                                        defaultValue={orderStore.firstName}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type Your Firstname. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="lastNameValidate">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name={"lastName"}
                                        onChange={handleChange}
                                        defaultValue={orderStore.lastName}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type Your Lastname. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="emailValidate">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder={placeholder}
                                        name={"email"}
                                        type="email"
                                        onChange={handleChange}
                                        defaultValue={orderStore.email}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type Your email. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="phoneValidate">
                                    <Form.Label>Contact Phone Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder={placeholder}
                                        name="contactPhone"
                                        onChange={handleChange}
                                        defaultValue={orderStore.contactPhone}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type Phone number. This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
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
                                        defaultValue={orderStore.deliveryAddress.city}
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
                                        defaultValue={orderStore.deliveryAddress.street}
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
                                        defaultValue={orderStore.deliveryAddress.buildingNumber}
                                    />
                                    <Form.Control.Feedback>Much better now</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type your building. This field is required
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
                            <div id="user-page-snackbar" className="col-12">
                                <Snackbar className="snackbar" />
                            </div>

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
                        <div id="user-page-snackbar" className="col-12">
                            <Snackbar className="snackbar" />
                        </div>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = ({
    cartReducer: { cartProducts },
    checkoutReduser: { orderStore }
         }) => ({
            orderStore,
            cartProducts,
        });

const mapDispatchToProps = ({
    setShowSnackbar, setSnackbarText, clearCart, setOrderToStore })

export default withStoreService()(
    connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);