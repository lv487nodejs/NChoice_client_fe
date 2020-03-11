import React from 'react';
import { Step, StepLabel, StepContent } from '@material-ui/core';

const ProductAddPageStep = ({ stepButtons, label, option }) => (
    <Step key={label}>
        <StepLabel>{label}</StepLabel>
        <StepContent>
            <div>
                {option}
                {stepButtons}
            </div>
        </StepContent>
    </Step>
);

export default ProductAddPageStep;
