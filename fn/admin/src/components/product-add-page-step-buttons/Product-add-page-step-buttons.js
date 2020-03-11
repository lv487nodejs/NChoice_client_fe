import React from 'react';

import { SaveButton, StepperBackButton, StepperNextButton } from '../buttons';

const StepperButtons = ({ activeStep, stepsLength, handleBack, handleNext, handleSave }) => (
    <div>
        <StepperBackButton activeStep={activeStep} eventHandler={handleBack} />
        {activeStep === stepsLength - 1 ? (
            <SaveButton eventHandler={handleSave} title="SAVE PRODUCT" />
        ) : (
            <StepperNextButton eventHandler={handleNext} />
        )}
    </div>
);

export default StepperButtons;
