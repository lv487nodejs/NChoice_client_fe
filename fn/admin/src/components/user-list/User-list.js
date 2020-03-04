import React, { useState, useEffect } from 'react';

import { List } from '@material-ui/core/';
import UserListItem from '../user-list-item';

import { useStyles } from './User-list-styles';

const UserList = () => {
    const [users, setUsers] = useState();

    const classes = useStyles();

    useEffect(() => {
        fetch('https://stark-headland-06017.herokuapp.com/users')
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setUsers(result);
            });
    }, [users, setUsers]);
    return (
        <List className={classes.root}>
            {users.map(user => (
                <UserListItem email={user.email} />
            ))}
        </List>
    );
};

export default UserList;
