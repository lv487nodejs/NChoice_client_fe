import React from 'react';
import { withRouter } from 'react-router-dom';

import { Tooltip, TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ProductListItem = props => {
    const { id, category, brand, title, msrp, price, history } = props;

    const editHandler = () => {
        history.push(`/product/${id}`);
    };

    return (
        <TableRow key={id}>
            <TableCell>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip onClick={editHandler} title="Edit">
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{brand}</TableCell>
            <TableCell>{msrp}</TableCell>
            <TableCell>{price}</TableCell>
        </TableRow>
    );
};
export default withRouter(ProductListItem);
