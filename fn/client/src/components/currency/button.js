import React from 'react';
import { connect } from 'react-redux';
import { currencyChange, currencyIconChange } from '../../actions';
import './button.css'

const currencies = {'EUR': '€', 'USD': '$', 'PLN': '‎zł'}

const Button = ({ currencyOptions, currencyChange, currencyIconChange }) => {
    const onClickHandler = () => {
        let coefficient = document.getElementById('currency').value;
        let iconName = document.getElementById('currency').querySelector('option:checked').getAttribute('data-text');

        currencyChange(coefficient)
    
        if(currencies.hasOwnProperty(iconName)){
            currencyIconChange(currencies[iconName])
        }
    };

    return (
        <>
            <select id='currency' onChange={onClickHandler}>
                {currencyOptions.map(item =>(
                    <option key={item.name} value={item.coefficient} data-text={item.name}>{item.name}</option>
                ))}
            </select>
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange, currencyIconChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
