import React from 'react';

import { Button } from '@material-ui/core';

const NEXT_BUTTON_TITLE = 'Next';

const StepperNextButton = ({ eventHandler }) => (
    <Button variant="contained" color="primary" onClick={eventHandler}>
        {NEXT_BUTTON_TITLE}
    </Button>
);

export default StepperNextButton;
