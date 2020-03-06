import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { usersLoaded, usersRequested } from '../../actions';
import { usersTableHead } from '../../config';

import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

const UserList = ({
    adminService,
    users,
    usersLoaded,
    usersRequested,
    history,
    loading,
}) => {
    useEffect(() => {
        usersRequested();
        adminService.getAllUsers().then(res => usersLoaded(res));
    }, [adminService, usersRequested, usersLoaded]);

    const userItems = users.map(user => (
        <TableContainerRow
            id={user._id}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            role={user.role}
            editHandler={() => {
                history.push(`/user/${user._id}`);
            }}
            deleteHandler={() => {
                console.log(user._id);
            }}
        />
    ));

    if (loading) {
        return <LoadingBar />;
    }
    return (
        <TableContainerGenerator
            tableTitles={usersTableHead}
            tableItems={userItems}
        />
    );
};

const mapStateToProps = ({ usersList: { users, loading } }) => ({
    users,
    loading,
});

const mapDispatchToProps = { usersLoaded, usersRequested };

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList))
);
