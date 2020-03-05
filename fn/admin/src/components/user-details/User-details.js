import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';
import { userLoaded, userEdit, userRequested } from '../../actions';
import LoadingBar from '../loading-bar';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const UserDetails = ({
    adminService,
    user,
    userLoaded,
    userEdit,
    disableEdit,
    userId,
    loading,
    userRequested,
}) => {
    const { email, firstName, lastName, role, date } = user;

    const classes = useStyles();
    useEffect(() => {
        userRequested();
        adminService.getUserById(userId).then(res => userLoaded(res));
    }, [adminService, userLoaded, userEdit, userId, disableEdit]);

    const clickHandler = () => userEdit(disableEdit);

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <form className={classes.root}>
            <TextField
                id="standard-read-only-input"
                label="Email"
                defaultValue={user.email}
                InputProps={{
                    readOnly: disableEdit,
                }}
            />
            <TextField
                id="standard-read-only-input"
                label="Last Name"
                defaultValue={user.lastName}
                InputProps={{
                    readOnly: disableEdit,
                }}
            />
            <TextField
                id="standard-read-only-input"
                label="First Name"
                defaultValue={user.firstName}
                InputProps={{
                    readOnly: disableEdit,
                }}
            />
            <Button onClick={clickHandler} variant="contained">
                Edit
            </Button>
        </form>
    );
};

const mapStateToProps = ({ usersList: { user, disableEdit, loading } }) => ({
    user,
    disableEdit,
    loading,
});
const mapDispatchToProps = { userLoaded, userEdit, userRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(UserDetails)
);
