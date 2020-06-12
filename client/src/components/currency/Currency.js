import React, { useEffect, useState } from 'react';
import Button from './button';

const API_KEY = '33903dccae5ac0b7de7910fc7a178078';
const BASE_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}`;

const currencies = { EUR: '€', USD: '$', UAH: '₴' };

function Currency() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const currenciesArray = Object.entries(data.rates);
        return currenciesArray;
      })
      .then((currency) =>
        currency.map(([currencyName, coefficient]) => ({
          name: currencyName,
          coefficient
        }))
      )
      .then((currency) =>
        currency.filter((i) => currencies.hasOwnProperty(i.name))
      )
      .then((currency) => {
        setCurrencyOptions(currency);
      });
  }, []);

  return <Button type='button' currencyOptions={currencyOptions} />;
}

export default Currency;
