import React from 'react';
import { withRouter } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const UserListItem = props => {
    const { email, id, lastName, firstName, role } = props;

    const clickHandler = () => {
        props.history.push(`/user/${id}`);
    };
    return (
        <TableRow onClick={clickHandler} id={id}>
            <TableCell align="left">{firstName}</TableCell>
            <TableCell align="left">{lastName}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{role}</TableCell>
        </TableRow>
    );
};

export default withRouter(UserListItem);
