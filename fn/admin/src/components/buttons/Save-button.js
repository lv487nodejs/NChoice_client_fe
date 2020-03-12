import React from 'react';

import { Button } from '@material-ui/core';

const SaveButton = props => {
    const { eventHandler, title, type } = props;

    return (
        <Button type={type} variant="contained" color="primary" onClick={eventHandler}>
            {title}
        </Button>
    );
};

export default SaveButton;
