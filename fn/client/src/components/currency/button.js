import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { currencyChange } from '../../actions';
import './button.css'


const Button = ({ currencyOptions, currency, currencyChange }) => {
    const [icon, setIcon] = useState(faEuroSign);

    const onClickHandler = () => {
        currency === 1 ? setIcon(faDollarSign) : setIcon(faEuroSign);
        currency === 1 ? currencyChange(currencyOptions) : currencyChange(1);
    };

    return (
        <>
            <FontAwesomeIcon className='currency-icon' onClick={onClickHandler} icon={icon} />
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
