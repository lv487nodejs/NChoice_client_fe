import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function Currency() {
    const currencies = {'EUR': '€', 'USD': '$', 'PLN': '‎zł'}

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
            .then(currency => setCurrencyOptions(currency.filter(i => {
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

