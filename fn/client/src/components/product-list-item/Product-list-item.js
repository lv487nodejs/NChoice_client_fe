import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

import './Product-list-item.css';

function ProductListItem({ title, description, keyID, images }) {
    return (
        <Card style={{ width: '18rem' }} key={keyID} className="productCart">
            <Card.Img variant="top" src={`/images/categories/${images}`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <>
                    <Button variant="outline-primary">Buy</Button>{' '}
                    <Button variant="outline-secondary">Add to card</Button>{' '}
                </>
            </Card.Body>
            <Card.Body className="cardPrice">
                <Card.Text>100</Card.Text>
            </Card.Body>
        </Card>
    );
}
export default ProductListItem;
