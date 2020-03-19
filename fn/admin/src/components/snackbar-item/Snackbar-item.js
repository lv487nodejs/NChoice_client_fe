import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { snackbarDuration } from '../../config';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const SnackbarItem = props => {
    const { open, severity, message, handleClose } = props;

    return (
        <Snackbar open={open} autoHideDuration={snackbarDuration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarItem;
