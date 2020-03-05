import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = props => {
    const { eventHandler } = props;

    return (
        <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={eventHandler}>
                <EditIcon />
            </IconButton>
        </Tooltip>
    );
};

export default EditButton;
