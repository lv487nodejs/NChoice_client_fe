import React from 'react';

import { Button } from '@material-ui/core';

const SaveButton = ({ title, eventHandler }) => (
    <Button variant="contained" color="primary" onClick={eventHandler}>
        {title}
    </Button>
);

export default SaveButton;
