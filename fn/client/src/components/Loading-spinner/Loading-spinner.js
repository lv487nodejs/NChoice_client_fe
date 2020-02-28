import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Loading-spinner.css';

const LoadingSpinner = () => (
    <div className="loading-spinner-container">
        <Spinner className="loading-spinner" animation="grow" />
    </div>
);

export default LoadingSpinner;
