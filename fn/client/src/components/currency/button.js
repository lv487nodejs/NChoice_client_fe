import React, { useState } from 'react';
import { connect } from 'react-redux';
import { currencyChange, currencyIconChange } from '../../actions';
import './button.css'

const Button = ({ currencyOptions, currencyChange, currencyIconChange, currencies }) => {
    const onClickHandler = () => {
        let cof = document.getElementById('currency').value;
        let iconName = document.getElementById('currency').querySelector('option:checked').getAttribute('data-text');

        currencyChange(cof)
    
        if(currencies.hasOwnProperty(iconName)){
            currencyIconChange(currencies[iconName])
        }
    };

    return (
        <>
            <select id='currency' onChange={onClickHandler}>
                <option key='EUR' value='1' data-text='EUR'>EUR</option>
                {currencyOptions.map(item =>(
                    <option key={item.name} value={item.cof} data-text={item.name}>{item.name}</option>
                ))}
            </select>
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange, currencyIconChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
