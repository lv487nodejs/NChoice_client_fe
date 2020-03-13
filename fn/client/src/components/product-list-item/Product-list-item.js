import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product-list-item.css';

import './Product-list-item.css'

function ProductListItem({ title, description, id, images, price, msrp }) {
    return (
        <Card key={id} className="productCart">
            <div className="image-container">
            <Card.Img variant="top" src={`/images/products/${images}`} className="cardsImage" />
            </div>
            <Card.Body>
                <Card.Title className="productName">{title}</Card.Title>
                <Card.Text className="description">{description}</Card.Text>
                <Card.Body className="bottomElements">
                <Card.Text className="cardPrice">{`${price} $`}</Card.Text>
                <Card.Text className="cardPrice msrp-price">{`${msrp} $`}</Card.Text>
                    <FontAwesomeIcon icon={faHeart} className="heart" />
                    <FontAwesomeIcon icon={faShoppingCart} className="cart" />
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

export default ProductListItem;
