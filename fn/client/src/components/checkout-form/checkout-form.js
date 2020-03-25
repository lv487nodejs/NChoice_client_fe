import React from 'react'
import './checkout-form.css'
import Cart from '../cart';
import { Jumbotron, Form, Button, Col, Row, Container } from 'react-bootstrap'

const CheckoutForm = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Jumbotron>
                        <Form>
                            <fieldset className="field">
                                <h3 className="text-center">Please fill in your address</h3>
                                <Form.Label>Country</Form.Label>

                                <Form.Label>Street</Form.Label>
                                <Form.Control placeholder="Type here..." />
                                <Form.Label>Building number</Form.Label>
                                <Form.Control placeholder="Type here..." />
                                <Form.Label>Contact Phone Number</Form.Label>
                                <Form.Control placeholder="Type here..." />
                            </fieldset>
                            <Form.Group className="form-space">
                                <fieldset className="field">
                                <h3 className="text-center">Please coose delivery type and payment method</h3>
                                    <Form.Label>Delivery Type</Form.Label>

                                    <Form.Label>Payment Method</Form.Label>

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
                        <Cart/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

export default CheckoutForm;
