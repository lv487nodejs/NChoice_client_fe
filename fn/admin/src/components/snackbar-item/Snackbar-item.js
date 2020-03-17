import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarItem = props => {
    const { open, msg } = props;

    return (
        <Snackbar open={open} autoHideDuration={4000}>
            <Alert severity="success">{msg}</Alert>
        </Snackbar>
    );
};

export default SnackbarItem;
