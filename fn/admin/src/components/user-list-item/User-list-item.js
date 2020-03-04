import React from 'react';

import { ListItem } from '@material-ui/core';

const UserListItem = props => {
    const { email } = props;
    return <ListItem>{email}</ListItem>;
};

export default UserListItem;
