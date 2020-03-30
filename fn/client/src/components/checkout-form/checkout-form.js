import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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

const CheckoutForm = ({products,storeService}) => {

    const [order, setOrder] = useState(orderForm)

    const productsINeed = products.map(product =>{
        return {
          item: product.id,
          quantity: product.quantity   
        }
    })

    const orderToServer = {
        "orderItems": productsINeed,
        "userId": "5e5c066c39d3fa165ca5eb3b", //TODO: change to real auth userID
        "deliveryAddress": {
            "country": order.country,
            "city": order.city,
            "street": order.street,
            "buildingNumber": order.buildingNumber
        },
        "deliveryType": order.deliveryType,
        "contactPhone": order.contactPhone,
        "paymentMethod": order.paymentMethod,
        "status": "pending"
    }

    const submitHandler = (event) => {
        event.preventDefault();
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
                        <Form onSubmit={submitHandler}>
                            <fieldset className="field">
                                <h3 className="text-center">Please fill in your address</h3>
                                <CheckoutSelect
                                    selectOptions={countries}
                                    name="country"
                                    handleChange={handleChange}
                                />
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="city"
                                    onChange={handleChange} />
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="street"
                                    onChange={handleChange} />
                                <Form.Label>Building number</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="buildingNumber"
                                    onChange={handleChange} />
                                <Form.Label>Contact Phone Number</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="contactPhone"
                                    onChange={handleChange} />
                            </fieldset>
                            <Form.Group className="form-space">
                                <fieldset className="field">
                                    <h3 className="text-center">Please coose delivery type and payment method</h3>
                                    <CheckoutSelect
                                        selectOptions={deliveryType}
                                        handleChange={handleChange} />
                                    <CheckoutSelect
                                        selectOptions={paymentMethods}
                                        handleChange={handleChange} />
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

const mapStateToProps = ({ cartReducer: { products } }) => ({
    products
});



export default withStoreService()(
    connect(mapStateToProps)(CheckoutForm)
    );

