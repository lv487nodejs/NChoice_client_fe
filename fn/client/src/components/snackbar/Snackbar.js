import React from 'react';
import { connect } from 'react-redux';
import { Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {setSnackbarStatus} from '../../actions'
const SnackbarItem = ({ snackbarStatus, setSnackbarStatus, snackbarText, snackbarDuration,snackbarSeverity}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarStatus(false);
    };
    return (
        <div>

        <Snackbar open={snackbarStatus} autoHideDuration={snackbarDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarText}
        </Alert>
      </Snackbar>
        </div>
    )
}
const mapStateToProps = ({ snackbarReducer: {
    snackbarStatus,
    snackbarText,
    snackbarDuration,
    snackbarSeverity,
} }) => ({ snackbarStatus, snackbarText, snackbarDuration, snackbarSeverity })

const mapDispatchToProps = {
setSnackbarStatus
}
export default connect(mapStateToProps,mapDispatchToProps)(SnackbarItem)
