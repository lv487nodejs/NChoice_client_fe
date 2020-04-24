import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import './Product-list-item.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from '../star-rating';

function ProductListItem({ title, description, id, images, price, mrsp, currency, currencyIcon, rate }) {

    const [priceWithRate, setPriceWithRate] = useState();
    const [msrpWithRate, setMsrpWithRate] = useState();

    useEffect(() => {
        setPriceWithRate(parseFloat(price * currency).toFixed(2));
        setMsrpWithRate(parseFloat(mrsp * currency).toFixed(2));
    }, [currency, price, mrsp]);

    return (
        <Card key={id} className="productCart">
            <Link key={id} to={`/products/${id}`}>
                <div className="image-container">
                    <Card.Img variant="top" src={`/images/products/${images}`} className="cardsImage" />
                </div>
            </Link>
            <Card.Body className="cardWrapper">
            <StarsRating rating={rate} />

                <Card.Title className="productName">{title}</Card.Title>
                <Card.Text className="description">{description}</Card.Text>
                <Card.Body className="bottomElements">
                    <Card.Text className="cardPrice">{`${priceWithRate} ${currencyIcon}`}</Card.Text>
                    <Card.Text className="cardPrice msrp-price">{`${msrpWithRate} ${currencyIcon}`}</Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = ({ productsList: { currency, currencyIcon } }) => ({ currency, currencyIcon });

export default connect(mapStateToProps)(ProductListItem);
