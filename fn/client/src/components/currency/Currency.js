import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';
const currencies = {'PLN': '‎zł', 'USD': '$', 'EUR': '€'}

function Currency() {
    const currencies = {'PLN': '‎zł', 'USD': '$', 'EUR': '€'}
    const [currencyOptions, setCurrencyOptions] = useState([]);
   
    useEffect(() => {

        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => Object.entries(data.rates))
            .then(currency => (currency.map(([curr, count]) => {
                return ({
                            name: curr,
                            cof: count
                        })
            }
            )))
            .then(cur => setCurrencyOptions(cur.filter(i => {
                if(currencies.hasOwnProperty(i.name)){
                    return (i.name)
                }
            })))
    }, []);

    return (
            <Button currencyOptions={currencyOptions} currencies={currencies}  />
    );
}

export default Currency;

