import React from 'react';
import './Checkout-text-input.css';
import { Form } from 'react-bootstrap'
import { placeholder } from '../../configs/frontend-config'


const CheckoutTextInput = ({ inputName, handleChange, value }) => {

const handler = (event) => {
    event.persist()
    console.log(event)
    handleChange(event)

}

    return (
        <Form.Group controlId={`${inputName}Validate`}>
            <Form.Label>{inputName}</Form.Label>
            <Form.Control
                required
                placeholder={placeholder}
                name={`${inputName}`}
                onChange={handler}
                value={value}
            />
            <Form.Control.Feedback>Much better now</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please type Your {inputName}. This field is required
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default CheckoutTextInput