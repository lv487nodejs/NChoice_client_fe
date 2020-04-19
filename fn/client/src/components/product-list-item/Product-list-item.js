import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product-list-item.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from '../star-rating';

function ProductListItem({ title, id, images, price, mrsp, currency, currencyIcon, rate }) {

    const [priceWithRate, setPriceWithRate] = useState();
    const [msrpWithRate, setMsrpWithRate] = useState();

    useEffect(() => {
        setPriceWithRate(Math.floor(price * currency));
        setMsrpWithRate(Math.floor(mrsp * currency));
    }, [currency, price, mrsp]);

    return (
        <div className="wrapper" key={id} >
            <div className="productCard"><img  alt={`${images}`} src={`/images/products/${images}`} />
                <Link key={id} to={`/products/${id}`}>
                    <div className="info" id={id}>
                        <StarsRating rating={rate} />
                        <p className="productName">{title}</p>
                        <div className="bottomElements">
                            <div className="cardPrice">{`${priceWithRate} ${currencyIcon}`}</div>
                            <div className="cardPrice msrp-price">{`${msrpWithRate} ${currencyIcon}`}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = ({ productsList: { currency, currencyIcon } }) => ({ currency, currencyIcon });

export default connect(mapStateToProps)(ProductListItem);
