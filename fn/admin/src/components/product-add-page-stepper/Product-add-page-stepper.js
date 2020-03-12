import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import { SaveButton, StepperBackButton, StepperNextButton } from '../buttons';

const SAVE_LABEL = 'SAVE PRODUCT';

const ProductAddPageStepper = ({ steps, labels, onSaveHandler }) => {
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

    const saveButton = <SaveButton type="submit" title={SAVE_LABEL} />;
    const nextButton = <StepperNextButton />;
    const backButton = <StepperBackButton activeStep={activeStep} eventHandler={handleBack} />;
    const doneButton = activeStep === lastStep ? saveButton : nextButton;

    const stepperSteps = steps.map((step, index) => {
        const onSubmitHandler = lastStep === index ? onSaveHandler : handleNext;

        return (
            <Step key={labels[index]}>
                <StepLabel>{labels[index]}</StepLabel>
                <StepContent>
                    <form onSubmit={onSubmitHandler}>
                        {step}
                        {backButton}
                        {doneButton}
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
