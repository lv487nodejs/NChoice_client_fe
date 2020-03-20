import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product-list-item.css';
import { connect } from 'react-redux';
import {addToCart, addToWishlist} from '../../actions'


function ProductListItem({ title, description, id, images, price, msrp, currency, addToCart, addToWishlist }) {
    const [priceWithRate, setPriceWithRate] = useState();
    const [msrpWithRate, setMsrpWithRate] = useState();
    const [currencyIcon, setCurrencyIcon] = useState();

    useEffect(() => {
        setPriceWithRate(Math.floor(price * currency));
        setMsrpWithRate(Math.floor(msrp * currency));
        currency === 1 ? setCurrencyIcon('€') : setCurrencyIcon('$');
    }, [currency, price, msrp]);

    return (
        <Card key={id} className="productCart">
            <div className="image-container">
                <Card.Img variant="top" src={`/images/products/${images}`} className="cardsImage" />
            </div>
            <Card.Body className="cardWrapper">
                <Card.Title className="productName">{title}</Card.Title>
                <Card.Text className="description">{description}</Card.Text>
                <Card.Body className="bottomElements">
                    <Card.Text className="cardPrice">{`${priceWithRate} ${currencyIcon}`}</Card.Text>
                    <Card.Text className="cardPrice msrp-price">{`${msrpWithRate} ${currencyIcon}`}</Card.Text>
                    <FontAwesomeIcon icon={faHeart} className="heart"
                           onClick={() => addToWishlist({id, title, description, images})}/>
          <FontAwesomeIcon icon={faShoppingCart} className="cart"
                           onClick={() => addToCart({id, title, price, msrp, currencyIcon, images})}/>
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = {addToCart, addToWishlist}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem);
