import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import wrapWithAdminService from '../wrappers';
import { userLoaded } from '../../actions';

const UserDetails = props => {
    const { adminService, user, userLoaded, userId } = props;

    useEffect(() => {
        adminService.getUserById(userId).then(res => userLoaded(res));
    }, [adminService, userLoaded, userId]);

    return <p> {user.email} </p>;
};

const mapStateToProps = ({ userDetails: { user } }) => ({ user });
const mapDispatchToProps = { userLoaded };

export default wrapWithAdminService()(connect(mapStateToProps, mapDispatchToProps)(UserDetails));
