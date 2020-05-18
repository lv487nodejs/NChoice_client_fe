import React, { useEffect, useState } from 'react';
import Button from './button';

// const BASE_URL = 'https://api.exchangeratesapi.io/latest';
const BASE_URL = 'http://data.fixer.io/api/latest?access_key=33903dccae5ac0b7de7910fc7a178078';

const currencies = {'EUR': '€', 'USD': '$', 'UAH': '₴'}

function Currency() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
   
    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                let currenciesArray = Object.entries(data.rates)
                // currenciesArray.unshift(['EUR', 1])
                return currenciesArray
            })
            .then(currency => (currency.map(([currencyName, coefficient]) => {
                return ({
                            name: currencyName,
                            coefficient: coefficient
                        })
            }
            )))
            .then(currency => currency.filter(i => currencies.hasOwnProperty(i.name)))
            .then(currency => {
                console.log(currency)
                setCurrencyOptions(currency);
            })
    }, []);

    return (
            <Button currencyOptions={currencyOptions}  />
    );
}

export default Currency;

