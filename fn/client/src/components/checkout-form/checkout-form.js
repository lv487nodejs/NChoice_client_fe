import React from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Form, Button, Col, Row, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { countries, paymentMethods, deliveryType } from '../../configs/frontend-config'
import CheckoutTable from '../checkout-table';
import CheckoutSelect from '../checkout-select';
import './checkout-form.css'


const CheckoutForm = () => {

    const submitHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.value);
    }

    const handleChange = (event) => {
        console.log(`${event.target.name}:${event.target.value}`);
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
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="street"
                                    onChange={handleChange} />
                                <Form.Label>Building number</Form.Label>
                                <Form.Control
                                    placeholder="Type here..."
                                    name="Building number"
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
                            >Go back to cart to make changes</Button>
                        </Link>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return state;
}



export default connect(mapStateToProps)(CheckoutForm);

