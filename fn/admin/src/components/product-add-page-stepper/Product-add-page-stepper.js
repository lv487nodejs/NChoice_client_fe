import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import StepperButtons from '../product-add-page-step-buttons/Product-add-page-step-buttons';

const ProductAddPageStepper = ({ steps, labels, onSaveHandler }) => {
    const [activeStep, setActiveStep] = useState(0);
    const stepsLength = steps.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const stepButtons = (
        <StepperButtons
            activeStep={activeStep}
            stepsLength={stepsLength}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSave={onSaveHandler}
        />
    );

    const stepperSteps = steps.map((option, index) => (
        <Step key={labels[index]}>
            <StepLabel>{labels[index]}</StepLabel>
            <StepContent>
                {option}
                {stepButtons}
            </StepContent>
        </Step>
    ));

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            {stepperSteps}
        </Stepper>
    );
};

export default ProductAddPageStepper;
