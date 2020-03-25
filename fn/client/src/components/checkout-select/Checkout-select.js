import React from 'react';
import './Checkout-select.css';
import { Form } from 'react-bootstrap'


const CheckoutSelect = ({ selectOptions }) => (
    <Form.Group>
        <Form.Label>{selectOptions.name}</Form.Label>
        <Form.Control as="select">
            {selectOptions.value.map(optionValue => <option>{optionValue}</option>)}
        </Form.Control>
    </Form.Group>
);

export default CheckoutSelect;
