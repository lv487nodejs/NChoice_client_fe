import React from 'react';
import { withRouter } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { TableRows } from '../tables';

const UserListItem = props => {
    const { email, id, lastName, firstName, role } = props;

    const clickHandler = () => {
        props.history.push(`/user/${id}`);
    };

    const userPropetries = [firstName, lastName, email, role];

    const userCells = userPropetries.map(propetry => (
        <TableCell>{propetry}</TableCell>
    ));

    return (
        <TableRows id={id} tableCells={userCells} editHandler={clickHandler} />
    );
};

export default withRouter(UserListItem);
