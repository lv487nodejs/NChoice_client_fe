import React from 'react';

import { Button } from '@material-ui/core';

const SaveButton = props => {
    const { eventHandler, title } = props;

    return (
        <Button variant="contained" color="primary" onClick={eventHandler}>
            {title}
        </Button>
    );
};

export default SaveButton;
