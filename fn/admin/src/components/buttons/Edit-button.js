import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = props => {
    const { eventHandler, size } = props;

    return (
        <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={eventHandler} color="primary">
                <EditIcon fontSize={size} />
            </IconButton>
        </Tooltip>
    );
};

export default EditButton;
