import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { currencyChange, currencyIconChange } from '../../actions';
import './button.css'


const Button = ({ currencyOptions, currency, currencyChange, currencyIconChange }) => {
    const [icon, setIcon] = useState(faEuroSign);

    const onClickHandler = (sel) => {
        // currency === 1 ? setIcon(faDollarSign) : setIcon(faEuroSign);
        let cof = document.getElementById('currency').value;
        let iconName = document.getElementById('currency').querySelector('option:checked').getAttribute('data-text');

        currencyChange(cof)

        switch(iconName){
            case 'USD':
                currencyIconChange('$')
                break
            case 'PLN':
                currencyIconChange('‎zł ')
                break
            default:
                currencyIconChange('€')
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
            {/* <FontAwesomeIcon className='currency-icon'  icon={icon} />     */}
        </>
    );
};

const mapStateToProps = ({ productsList: { currency } }) => ({ currency });
const mapDispatchToProps = { currencyChange, currencyIconChange };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
