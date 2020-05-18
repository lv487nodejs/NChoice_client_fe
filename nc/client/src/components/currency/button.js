import React from 'react';
import { connect } from 'react-redux';
import { currencyChange, currencyIconChange } from '../../actions';
import './button.css'

const currencies = {'EUR': '€', 'USD': '$', 'PLN': '‎zł'}

const Button = ({ currencyOptions, currencyChange, currencyIconChange }) => {
    const selectCurrency = (val) => {
        currencyChange(val.coefficient)
        currencyIconChange(currencies[val.name])
    };

    const onClickHandler = (item) => () => {
        selectCurrency(item)
    }

    return (
        <>
            <div className="dropdown">
            <button className="curr"><img className='img-curr' alt="currency" src='/images/dollar.png'></img></button>
            <ul className="currency">
                {currencyOptions.map(item =>(
                    <li key={item.name}><button className='button-currency' onClick={onClickHandler(item)}>{item.name}</button></li>
                ))}
            </ul>
            </div>
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange, currencyIconChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
