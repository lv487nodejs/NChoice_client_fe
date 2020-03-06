import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product-list-item.css';
import { connect } from 'react-redux';
import { productAddedToCart } from '../../actions';

function ProductListItem({ title, description,key, id, images, price, msrp, currency, addToCart }) {
    const [priceWithRate, setPriceWithRate] = useState();
    const [msrpWithRate, setMsrpWithRate] = useState();
    const [currencyIcon, setCurrencyIcon] = useState();


    useEffect(() => {
        setPriceWithRate(Math.floor(price * currency));
        setMsrpWithRate(Math.floor(msrp * currency));
        currency === 1 ? setCurrencyIcon('€') : setCurrencyIcon('$');
    }, [currency, price, msrp]);

    console.log('id', id);
    return (
        <Card key={key} className="productCart">
            <div className="image-container">
                <Card.Img variant="top" src={`/images/products/${images}`} className="cardsImage" />
            </div>
            <Card.Body>
                <Card.Title className="productName">{title}</Card.Title>
                <Card.Text className="description">{description}</Card.Text>
                <Card.Body className="bottomElements">
                    <Card.Text className="cardPrice">{`${priceWithRate} ${currencyIcon}`}</Card.Text>
                    <Card.Text className="cardPrice msrp-price">{`${msrpWithRate} ${currencyIcon}`}</Card.Text>
                    <FontAwesomeIcon icon={faHeart} className="heart" />
                    <FontAwesomeIcon icon={faShoppingCart} className="cart" onClick={()=>addToCart(id)} />
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = ({ productsList: { currency  } }) => ({ currency });
const mapDispatchToProps = dispatch => ({
    addToCart: id => dispatch(productAddedToCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
