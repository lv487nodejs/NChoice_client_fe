import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = props => {
    const { eventHandler, size } = props;

    return (
        <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={eventHandler} color="secondary">
                <DeleteIcon fontSize={size} />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteButton;
