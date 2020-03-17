import React from 'react';

import { Button } from '@material-ui/core';

const SaveButton = ({ title, type, eventHandler }) => (
    <Button variant="contained" color="primary" type={type} onClick={eventHandler}>
        {title}
    </Button>
);

export default SaveButton;
