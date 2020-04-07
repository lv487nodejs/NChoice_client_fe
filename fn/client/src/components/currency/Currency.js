import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';
const currencies = {'EUR': '€', 'USD': '$', 'PLN': '‎zł'}

function Currency() {

    const [currencyOptions, setCurrencyOptions] = useState([]);
   
    useEffect(() => {



        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                let currenciesArray = Object.entries(data.rates)
                currenciesArray.unshift(['EUR', 1])
                return currenciesArray
            })
            .then(currency => (currency.map(([currencyName, coefficient]) => {
                return ({
                            name: currencyName,
                            coefficient: coefficient
                        })
            }
            )))
            .then(currency => currency.filter(i => !currencies.hasOwnProperty(i.name)))
            .then(currency => {
                const currencyNames = currency.map(item => item.name);
                setCurrencyOptions(currencyNames);
            })
    }, []);

    return (
            <Button currencyOptions={currencyOptions} currencies={currencies}  />
    );
}

export default Currency;

