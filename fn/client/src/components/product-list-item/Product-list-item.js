import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product-list-item.css';

function ProductListItem({ title, description, keyID }) {
    return (
        <Card style={{ width: '20rem' }} key={keyID} className="productCart">
            <Card.Img variant="top" src="/images/hoody.jpg" className="cardsImage" />
            <Card.Body>
                <Card.Title className="productName">{title}</Card.Title>
                <Card.Text className="description">
                    {description}
                </Card.Text>
                <Card.Body className="bottomElements">
                    <Card.Text className="cardPrice">100 $ </Card.Text>
                    <FontAwesomeIcon icon={faHeart} className="heart" />
                    <FontAwesomeIcon icon={faShoppingCart} className="cart" />
                </Card.Body>
            </Card.Body>
        </Card>
    );
}


export default ProductListItem;
