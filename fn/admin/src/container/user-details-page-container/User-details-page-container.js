import React from 'react';
import { useStyles } from './User-details-page-container-styles';

import UserDetails from '../../components/user-details';

const UserDetailsPageContainer = props => {
    const classes = useStyles();
    const { id } = props.match.params;
    return (
        <div className={classes.content}>
            <UserDetails userId={id} />
        </div>
    );
};

export default UserDetailsPageContainer;
