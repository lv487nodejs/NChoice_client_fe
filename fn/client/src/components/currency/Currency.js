import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function Currency() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
   
    useEffect(() => {

        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => Object.entries(data.rates))
            .then(currency => {for (const [curr, count] of currency) {
                setCurrencyOptions({
                    name: curr,
                    cof: count
                })
              }})
    }, []);
    

    return (
            <Button currencyOptions={currencyOptions} />
    );
}

export default Currency;
