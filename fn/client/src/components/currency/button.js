import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons';

const Button = ({ currencyOptions }) => {
    const [icon, setIcon] = useState(faEuroSign);
    const [cof, setCof] = useState(1);
    useEffect(() => {}, [icon]);

    const onClickHandler = () => {
        icon === faEuroSign ? setIcon(faDollarSign) : setIcon(faEuroSign);
        icon === faEuroSign ? setCof(1) : setCof(currencyOptions);
    };

    return (
        <>
            {console.log(cof)}
            <FontAwesomeIcon onClick={onClickHandler} icon={icon} />
        </>
    );
};

export default Button;
