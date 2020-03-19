import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputLabel, Select } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';
import { userLoaded, userEdit, userRequested, userSave, userSetRole } from '../../actions';
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
    userSave,
    userSetRole,
}) => {
    const classes = useStyles();

    const { userService } = adminService;

    useEffect(() => {
        userRequested();
        userService.getUserById(userId).then(res => userLoaded(res));
    }, [userService, userLoaded, userId, userRequested, userSave, userSetRole]);

    const clickEditHandler = () => userEdit(disableEdit);

    const changeHandler = e => userSetRole(e.target.value);

    const submitHandler = async e => {
        e.preventDefault();
        userEdit(disableEdit);
        const userToSend = {
            id: user._id,
            firstName: e.target.firstName.value,
            email: e.target.email.value,
            lastName: e.target.lastName.value,
            role: e.target.role.value,
        };
        // const updatedUser = await adminService.putUser(userToSend);
        console.log(userToSend);
        // return userSave(updatedUser);
    };

    if (loading) {
        return <LoadingBar />;
    }

    const inputFields = (
        <div>
            <TextField id="email" label="Email" defaultValue={user.email} disabled={disableEdit} />
            <TextField
                id="lastName"
                label="Last Name"
                defaultValue={user.lastName}
                disabled={disableEdit}
            />
            <TextField
                id="firstName"
                label="First Name"
                disabled={disableEdit}
                defaultValue={user.firstName}
            />
            <InputLabel id="label">Role</InputLabel>
            <Select
                id="role"
                labelId="label"
                value={user.role}
                disabled={disableEdit}
                onChange={changeHandler}
                inputProps={{
                    name: 'role',
                    id: 'role',
                }}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </Select>
        </div>
    );

    const buttons = (
        <div>
            <Button type="submit" color="secondary" variant="contained" disabled={disableEdit}>
                Save
            </Button>
            <Button
                color="primary"
                onClick={clickEditHandler}
                variant="contained"
                disabled={!disableEdit}
            >
                Edit
            </Button>
        </div>
    );

    return (
        <form onSubmit={submitHandler} className={classes.root}>
            {inputFields}
            {buttons}
        </form>
    );
};

const mapStateToProps = ({ usersState: { user, disableEdit, loading } }) => ({
    user,
    disableEdit,
    loading,
});
const mapDispatchToProps = {
    userLoaded,
    userEdit,
    userRequested,
    userSave,
    userSetRole,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
