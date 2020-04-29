import React from 'react';
import './Checkout-select.css';
import { Form } from 'react-bootstrap'


const CheckoutSelect = ({ selectOptions, handleChange }) => {

    const options = selectOptions.value.map(optionValue =>
            <option key={optionValue}>{optionValue}</option>);

    return (
        <Form.Group controlId={`${selectOptions.name}Validate`}>
            <Form.Label>{selectOptions.title}</Form.Label>
            <Form.Control
                required
                as="select"
                name={selectOptions.name}
                onChange={handleChange}>
                {options}
            </Form.Control>
            <Form.Control.Feedback>Much better now</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please choose {selectOptions.title}. This field is required
        </Form.Control.Feedback>
        </Form.Group>
    );
}
export default CheckoutSelect;
