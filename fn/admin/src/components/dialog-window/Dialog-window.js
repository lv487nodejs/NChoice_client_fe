import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core/';
import { connect } from 'react-redux';
import { setDialogStatus } from '../../actions';

const CANCEL_TITLE = 'Cancel';

const DialogWindow = ({
    setDialogStatus,
    dialogStatus,
    dialogTitle,
    dialogContent,
    buttonTitle,
    eventHandler,
}) => {
    const handleClose = () => {
        setDialogStatus(false);
    };

    return (
        <Dialog onClose={handleClose} open={dialogStatus}>
            <DialogTitle onClose={handleClose}>{dialogTitle}</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>{dialogContent}</Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} variant="contained" color="primary">
                    {CANCEL_TITLE}
                </Button>
                <Button onClick={eventHandler} variant="contained" color="success">
                    {buttonTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({
    dialogWindowState: { dialogStatus, dialogTitle, dialogContent, buttonTitle, eventHandler },
}) => ({ dialogStatus, dialogTitle, dialogContent, buttonTitle, eventHandler });

const mapDispatchToProps = { setDialogStatus }

export default connect(mapStateToProps, mapDispatchToProps)(DialogWindow);
