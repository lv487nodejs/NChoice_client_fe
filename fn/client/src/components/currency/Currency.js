import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function Currency() {
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
                if(i.name === 'USD' || i.name === 'PLN'){
                    return i
                }
            })))
    }, []);

    return (
            <Button currencyOptions={currencyOptions} />
    );
}

export default Currency;


// .then((currency => {for (const [curr, count] of currency) {
//     return ({
//         name: curr,
//         cof: count
//     })
//   }}))