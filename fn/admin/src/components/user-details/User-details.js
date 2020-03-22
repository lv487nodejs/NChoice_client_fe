import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, Paper, MenuItem, FormControl } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';
import { setUser, userLoadingStatus } from '../../actions';
import LoadingBar from '../loading-bar';
import { SaveButton } from '../buttons';
import { useStyles } from './User-details-style';

const UserDetails = ({ adminService, user, userId, loading, setUser, userLoadingStatus }) => {
    const classes = useStyles();

    const { usersService } = adminService;

    useEffect(() => {
        userLoadingStatus();
        usersService.getUserById(userId).then(res => {
            setUser(res);
        });
    }, [usersService, userId, userLoadingStatus, setUser]);

    const changeHandler = e => {
        const newUser = { ...user };
        newUser.role = e.target.value;
        setUser(newUser);
    };

    const submitHandler = e => {
        e.preventDefault();
        const newUser = { ...user };
        usersService.putUserRole(newUser);
    };

    if (loading) {
        return <LoadingBar />;
    }

    const inputFields = (
        <div>
            <TextField
                id="email"
                label="Email"
                variant="outlined"
                defaultValue={user.email}
                disabled
            />
            <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                defaultValue={user.lastName}
                disabled
            />
            <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                disabled
                defaultValue={user.firstName}
            />
            <FormControl id="roleControl" variant="outlined">
                <InputLabel id="label">Role</InputLabel>
                <Select
                    className={classes.selectElement}
                    labelId="label"
                    id="role"
                    value={user.role}
                    onChange={changeHandler}
                    label="Role"
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
            </FormControl>
        </div>
    );

    return (
        <form onSubmit={submitHandler} className={classes.root}>
            <Paper>
                {inputFields}
                <SaveButton type="submit" title="Save" />
            </Paper>
        </form>
    );
};

const mapStateToProps = ({ usersState: { user, loading } }) => ({
    user,
    loading,
});
const mapDispatchToProps = {
    setUser,
    userLoadingStatus,
};

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
