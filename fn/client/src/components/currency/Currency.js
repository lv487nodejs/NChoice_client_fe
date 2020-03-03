import React, { useEffect, useState } from 'react';
import Button from './button';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function Currency() {
    const [currencyOptions, setCurrencyOptions] = useState([]);

    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => Object.entries(data.rates)[26])
            .then(coff => setCurrencyOptions(coff[1]));
    }, []);

    return (
            <Button currencyOptions={currencyOptions} />
    );
}

export default Currency;
