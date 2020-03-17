import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import { SaveButton, StepperBackButton, StepperNextButton } from '../buttons';

import { PRODUCT_ADD_STEPS_LABEL } from '../../config';

const SAVE_LABEL = 'SAVE PRODUCT';
const labels = PRODUCT_ADD_STEPS_LABEL;

const ProductAddPageStepper = ({ steps, onSaveHandler }) => {
    const [activeStep, setActiveStep] = useState(0);
    const stepsLength = steps.length;

    const handleNext = event => {
        event.preventDefault();
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const lastStep = stepsLength - 1;

    const buttons = {
        nextButton: <StepperNextButton />,
        backButton: <StepperBackButton activeStep={activeStep} eventHandler={handleBack} />,
    };

    if (activeStep === lastStep)
        buttons.nextButton = <SaveButton type="submit" title={SAVE_LABEL} />;

    const stepperSteps = steps.map((step, index) => {
        const onSubmitHandler = lastStep === index ? onSaveHandler : handleNext;

        return (
            <Step key={labels[index]}>
                <StepLabel>{labels[index]}</StepLabel>
                <StepContent>
                    <form onSubmit={onSubmitHandler}>
                        {step}
                        {buttons.backButton}
                        {buttons.nextButton}
                    </form>
                </StepContent>
            </Step>
        );
    });

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            {stepperSteps}
        </Stepper>
    );
};

export default ProductAddPageStepper;
