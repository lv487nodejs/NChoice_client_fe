import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './Users-page-container-styles';

import UserList from '../../components/user-list';

const UsersPageContainer = () => {
    const classes = useStyles();

    return (
        <Typography className={classes.usersPageContainer}>
            <UserList />
        </Typography>
    );
};

export default UsersPageContainer;
