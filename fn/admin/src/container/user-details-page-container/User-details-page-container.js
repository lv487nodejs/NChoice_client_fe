import React from 'react';
import { useStyles } from './User-details-page-container-styles';

import UserDetails from '../../components/user-details';

const UserDetailsPageContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <UserDetails />
        </div>
    );
};

export default UserDetailsPageContainer;
