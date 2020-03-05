import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserListItem from '../user-list-item';

import { useStyles } from './User-list-styles';

import { usersLoaded } from '../../actions';
import wrapWithAdminService from '../wrappers';

const UserList = props => {
    const { adminService, users, usersLoaded } = props;

    const classes = useStyles();

    useEffect(() => {
        adminService.getAllUsers().then(res => usersLoaded(res));
    }, [adminService, usersLoaded]);

    const userItems = users.map(user => (
        <UserListItem
            key={user._id}
            id={user._id}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            role={user.role}
        />
    ));

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{userItems}</TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = ({ usersList: { users } }) => ({ users });
const mapDispatchToProps = { usersLoaded };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(UserList)
);
