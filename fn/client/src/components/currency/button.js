import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { currencyChange, currencyIconChange } from '../../actions';
import './button.css'



const Button = ({ currencyOptions, currency, currencyChange, currencyIconChange }) => {
    const [icon, setIcon] = useState(faEuroSign);

    const onClickHandler = (value) => {
        // currency === 1 ? setIcon(faDollarSign) : setIcon(faEuroSign);
        // currency === 1 ? currencyIconChange('$') : currencyIconChange('€');
        // currency === 1 ? currencyChange(currencyOptions.USD) : currencyChange(1);
        value === 'EUR' ? currencyChange(1) :
        value === 'USD' ? currencyChange(currencyOptions):
        currencyChange(currencyOptions.PHP)
    };

    console.log(currencyOptions)
    return (
        <>
            <select onChange={()=>{onClickHandler()}}>
                <option >{currencyOptions.name}</option>
            </select>
            {/* <FontAwesomeIcon className='currency-icon'  icon={icon} />     */}
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange, currencyIconChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
