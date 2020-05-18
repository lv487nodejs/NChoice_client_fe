import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product-list-item.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from '../star-rating';
import { getFromLocalStorage } from '../../services/localStoreService';

const accessToken = getFromLocalStorage('accessToken');
function ProductListItem({ title, id, images, price, mrsp, currency, currencyIcon, rate }) {

    const [priceWithRate, setPriceWithRate] = useState();
    const [msrpWithRate, setMsrpWithRate] = useState();

    useEffect(() => {
        setPriceWithRate(parseFloat(price * currency).toFixed(2));
        setMsrpWithRate(parseFloat(mrsp * currency).toFixed(2));
    }, [currency, price, mrsp]);
    return (
        <div className="wrapper" id="wrapper" key={id} >
            <div className="productCard" id="productCard"><img id="productImg" alt={`${images}`} src={`/images/products/${images}`} />
                <Link id="productLink" key={id} to={`/products/${id}`}>
                    <div className="info" id={id}>

                        <StarsRating rating={rate} id={id} accessToken={accessToken}/>

                        <p className="productName" id="productName">{title}</p>
                        <div className="bottomElements" id="bottomElements">
                            <div className="cardPrice" id="realPrice">{`${priceWithRate} ${currencyIcon}`}</div>
                            <div className="cardPrice msrp-price" id="msrpPrice">{`${msrpWithRate} ${currencyIcon}`}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = ({ productsList: { currency, currencyIcon } }) => ({ currency, currencyIcon });

export default connect(mapStateToProps)(ProductListItem);
